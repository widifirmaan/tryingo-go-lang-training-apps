# Week 14: Concurrency II

## Overview
Advanced concurrency primitives: `select` for multiplexing channels, `Mutex` for mutual exclusion, `sync.Once` for one-time initialization, and `atomic` for lock-free operations.

## Objectives
- Multiplex channels with select
- Synchronize with mutexes
- Perform one-time initialization
- Use atomic operations for counters
- Combine primitives for real-world patterns

## Weekly Project: Chat Server
Build a concurrent chat server with multiple rooms, broadcasting, graceful shutdown, and connection rate limiting using select, mutex, and atomic.

## Lessons
1. [Select](01-select.md)
2. [Mutex](02-mutex.md)
3. [Once](03-once.md)
4. [Atomic](04-atomic.md)
