# Consensus Algorithms

Implement distributed consensus algorithms in Go.

## Paxos Overview

```go
type PaxosNode struct {
    id          string
    peers       []string
    promiseNum  int64
    acceptedNum int64
    acceptedVal string
    decidedVal  string
    mu          sync.Mutex
}

type Prepare struct {
    ProposalNum int64
    From        string
}

type Promise struct {
    ProposalNum int64
    AcceptedNum int64
    AcceptedVal string
}

type Accept struct {
    ProposalNum int64
    ProposalVal string
    From        string
}

type Accepted struct {
    ProposalNum int64
    ProposalVal string
}

func (n *PaxosNode) PreparePhase(value string) (bool, error) {
    n.mu.Lock()
    n.promiseNum++
    proposalNum := n.promiseNum
    n.mu.Unlock()

    promises := 0
    quorum := len(n.peers)/2 + 1

    for _, peer := range n.peers {
        resp, err := n.sendPrepare(peer, Prepare{
            ProposalNum: proposalNum,
            From:        n.id,
        })
        if err == nil {
            promises++
        }
        _ = resp
    }

    if promises < quorum {
        return false, fmt.Errorf("failed to get quorum")
    }
    return true, nil
}
```

## Basic Leader Election

```go
type LeaderElection struct {
    id        string
    peers     []string
    term      int64
    votedFor  string
    isLeader  bool
    heartbeat time.Duration
    mu        sync.Mutex
}

func (e *LeaderElection) Start() {
    for {
        e.mu.Lock()
        if !e.isLeader {
            e.mu.Unlock()
            e.startElection()
        } else {
            e.mu.Unlock()
            e.sendHeartbeats()
        }
        time.Sleep(e.heartbeat)
    }
}

func (e *LeaderElection) startElection() {
    e.mu.Lock()
    e.term++
    e.votedFor = e.id
    votes := 1
    e.mu.Unlock()

    for _, peer := range e.peers {
        if e.requestVote(peer) {
            votes++
        }
    }

    if votes > len(e.peers)/2 {
        e.mu.Lock()
        e.isLeader = true
        e.mu.Unlock()
        slog.Info("elected as leader", "term", e.term)
    }
}
```

## Gossip Protocol

```go
type GossipNode struct {
    id      string
    state   map[string]string
    version int64
    peers   []string
}

func (n *GossipNode) Gossip() {
    for {
        peer := n.peers[rand.Intn(len(n.peers))]
        state, err := n.syncState(peer)
        if err == nil {
            n.mergeState(state)
        }
        time.Sleep(100 * time.Millisecond)
    }
}

func (n *GossipNode) mergeState(remote map[string]string) {
    for k, v := range remote {
        if _, exists := n.state[k]; !exists {
            n.state[k] = v
        }
    }
}
```

## Practice
1. Implement a complete Paxos protocol
2. Build a leader election for a distributed service
3. Create a gossip-based membership protocol
