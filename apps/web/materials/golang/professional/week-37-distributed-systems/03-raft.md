# Raft Consensus

Implement the Raft consensus algorithm for replicated state machines.

## Raft State

```go
type State int

const (
    Follower State = iota
    Candidate
    Leader
)

type RaftNode struct {
    mu        sync.Mutex
    id        string
    state     State
    peers     []string

    // Persistent state
    currentTerm int64
    votedFor    string
    log         []LogEntry

    // Volatile state
    commitIndex int64
    lastApplied int64

    // Leader state
    nextIndex  []int64
    matchIndex []int64

    // Channels
    votes       chan VoteResponse
    appendCh    chan AppendEntries
    electionCh  chan struct{}
}

type LogEntry struct {
    Term    int64
    Command interface{}
}

type AppendEntries struct {
    Term         int64
    LeaderID     string
    PrevLogIndex int64
    PrevLogTerm  int64
    Entries      []LogEntry
    LeaderCommit int64
}
```

## RequestVote RPC

```go
func (n *RaftNode) RequestVote(args *RequestVoteArgs, reply *RequestVoteReply) error {
    n.mu.Lock()
    defer n.mu.Unlock()

    if args.Term < n.currentTerm {
        reply.Term = n.currentTerm
        reply.VoteGranted = false
        return nil
    }

    if args.Term > n.currentTerm {
        n.currentTerm = args.Term
        n.state = Follower
        n.votedFor = ""
    }

    if n.votedFor == "" || n.votedFor == args.CandidateID {
        // Check log is at least as up-to-date
        if args.LastLogTerm > n.log[len(n.log)-1].Term ||
            (args.LastLogTerm == n.log[len(n.log)-1].Term &&
                args.LastLogIndex >= int64(len(n.log)-1)) {
            n.votedFor = args.CandidateID
            reply.VoteGranted = true
            n.electionCh <- struct{}{}
        }
    }

    reply.Term = n.currentTerm
    return nil
}
```

## Log Replication

```go
func (n *RaftNode) AppendEntries(args *AppendEntriesArgs, reply *AppendEntriesReply) error {
    n.mu.Lock()
    defer n.mu.Unlock()

    if args.Term < n.currentTerm {
        reply.Term = n.currentTerm
        reply.Success = false
        return nil
    }

    if args.Term > n.currentTerm {
        n.currentTerm = args.Term
        n.state = Follower
    }

    // Log consistency check
    if args.PrevLogIndex >= int64(len(n.log)) {
        reply.Term = n.currentTerm
        reply.Success = false
        return nil
    }

    if n.log[args.PrevLogIndex].Term != args.PrevLogTerm {
        n.log = n.log[:args.PrevLogIndex]
        reply.Term = n.currentTerm
        reply.Success = false
        return nil
    }

    // Append new entries
    n.log = append(n.log[:args.PrevLogIndex+1], args.Entries...)

    // Update commit index
    if args.LeaderCommit > n.commitIndex {
        n.commitIndex = min(args.LeaderCommit, int64(len(n.log)-1))
    }

    reply.Term = n.currentTerm
    reply.Success = true
    return nil
}
```

## Apply Committed Entries

```go
func (n *RaftNode) applyLoop(stateMachine StateMachine) {
    for {
        n.mu.Lock()
        entriesToApply := n.log[n.lastApplied+1 : n.commitIndex+1]
        n.mu.Unlock()

        for _, entry := range entriesToApply {
            stateMachine.Apply(entry.Command)
        }

        n.mu.Lock()
        n.lastApplied = n.commitIndex
        n.mu.Unlock()

        time.Sleep(10 * time.Millisecond)
    }
}
```

## Practice
1. Implement a Raft-based key-value store
2. Add cluster membership changes
3. Build a Raft CLI cluster management tool
