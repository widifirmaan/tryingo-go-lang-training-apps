# Week 24: Advanced Concurrency

Go's concurrency primitives (goroutines and channels) enable powerful patterns for building concurrent systems. This week covers pipeline patterns, fan-in/fan-out, worker pools, and generators.

## Topics

- Pipeline patterns with channels
- Fan-in and fan-out concurrency
- Worker pools for task distribution
- Generator functions with channels

## Goals

- Design and implement concurrent pipelines
- Distribute work across multiple goroutines
- Build reusable worker pools
- Create channel-based generators

## Key Concepts

| Concept | Description |
|---------|-------------|
| Pipeline | Series of stages connected by channels |
| Fan-Out | Distributing work across multiple goroutines |
| Fan-In | Merging results from multiple goroutines |
| Worker Pool | Fixed set of goroutines processing tasks |
| Generator | Function that produces values via channel |

## Practice Exercises

1. Build a pipeline that reads, processes, and writes data
2. Implement fan-out/fan-in for parallel computations
3. Create a configurable worker pool
4. Write a generator for Fibonacci sequence
