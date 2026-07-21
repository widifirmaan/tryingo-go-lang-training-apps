# Contributing to Open Source

Learn how to contribute effectively to Go open source projects.

## Finding Projects

```go
// Criteria for choosing a project:
var criteria = []string{
    "Active maintenance (commits in last 3 months)",
    "Clear contributing guidelines",
    "Good first issue labels",
    "Responsive maintainers",
    "Well-documented codebase",
    "Projects you use daily",
}

func findProject() *Project {
    return &Project{
        Name:        "cobra",
        Description: "CLI framework for Go",
        FirstIssue:  "add completion for fish shell",
        Language:    "Go",
        Stars:       37000,
    }
}
```

## Contribution Workflow

```go
// 1. Set up the project
git clone https://github.com/spf13/cobra.git
cd cobra
go test ./...
go vet ./...

// 2. Create a branch
git checkout -b feat/add-fish-completion

// 3. Make changes
func AddFishCompletion(cmd *Command) error {
    // Implementation
}

// 4. Write tests
func TestFishCompletion(t *testing.T) {
    // Test cases
}

// 5. Run all checks
go test ./... -race
golangci-lint run ./...

// 6. Commit with conventional commit message
git commit -m "feat: add fish shell completion support"
```

## Pull Request Best Practices

```go
type PullRequest struct {
    Title       string
    Description string
    Changes     []Change
    Tests       []string
    Screenshots []string
    Breaking    bool
}

func newGoodPR() PullRequest {
    return PullRequest{
        Title: "feat: add support for fish shell completion",
        Description: `## What
Adds auto-completion for the fish shell.

## Why
Fish shell users need completion support for better CLI experience.

## Testing
- Unit tests for fish completion generation
- Manual testing with fish shell v3.6

## Related Issues
Closes #1234`,
        Changes:  []Change{{File: "completions.go", Lines: 45}},
        Tests:    []string{"TestFishCompletion"},
        Breaking: false,
    }
}
```

## Practice
1. Find a Go project with good first issues
2. Set up the project locally
3. Submit a pull request with a small fix
