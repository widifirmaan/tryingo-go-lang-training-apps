# Building a REST API

A practical guide to building a complete REST API using only the standard library.

## Project Structure

```
api/
├── main.go
├── handler/
│   ├── user.go
│   └── product.go
├── middleware/
│   ├── logging.go
│   └── auth.go
├── model/
│   └── types.go
└── store/
    └── memory.go
```

## Full REST Example

```go
package main

import (
    "encoding/json"
    "net/http"
    "sync"
)

type Todo struct {
    ID    string `json:"id"`
    Title string `json:"title"`
    Done  bool   `json:"done"`
}

type TodoStore struct {
    mu    sync.RWMutex
    items map[string]Todo
}

func NewTodoStore() *TodoStore {
    return &TodoStore{items: make(map[string]Todo)}
}

func (s *TodoStore) List() []Todo {
    s.mu.RLock()
    defer s.mu.RUnlock()
    result := make([]Todo, 0, len(s.items))
    for _, t := range s.items {
        result = append(result, t)
    }
    return result
}

func (s *TodoStore) Create(t Todo) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.items[t.ID] = t
}

func (s *TodoStore) Get(id string) (Todo, bool) {
    s.mu.RLock()
    defer s.mu.RUnlock()
    t, ok := s.items[id]
    return t, ok
}

func (s *TodoStore) Delete(id string) {
    s.mu.Lock()
    defer s.mu.Unlock()
    delete(s.items, id)
}

type TodoHandler struct {
    store *TodoStore
}

func (h *TodoHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        if id := r.PathValue("id"); id != "" {
            h.getTodo(w, r, id)
        } else {
            h.listTodos(w, r)
        }
    case http.MethodPost:
        h.createTodo(w, r)
    case http.MethodDelete:
        h.deleteTodo(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func (h *TodoHandler) listTodos(w http.ResponseWriter, r *http.Request) {
    todos := h.store.List()
    writeJSON(w, http.StatusOK, todos)
}

func (h *TodoHandler) createTodo(w http.ResponseWriter, r *http.Request) {
    var todo Todo
    if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
        writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
        return
    }
    h.store.Create(todo)
    writeJSON(w, http.StatusCreated, todo)
}

func (h *TodoHandler) getTodo(w http.ResponseWriter, r *http.Request, id string) {
    todo, ok := h.store.Get(id)
    if !ok {
        writeJSON(w, http.StatusNotFound, map[string]string{"error": "not found"})
        return
    }
    writeJSON(w, http.StatusOK, todo)
}

func (h *TodoHandler) deleteTodo(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    h.store.Delete(id)
    w.WriteHeader(http.StatusNoContent)
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

func main() {
    store := NewTodoStore()
    handler := &TodoHandler{store: store}

    mux := http.NewServeMux()
    mux.Handle("GET /todos", handler)
    mux.Handle("POST /todos", handler)
    mux.Handle("GET /todos/{id}", handler)
    mux.Handle("DELETE /todos/{id}", handler)

    http.ListenAndServe(":8080", mux)
}
```

## Practice

1. Add PUT (update) endpoint to the todo API
2. Implement pagination with query parameters
3. Add validation middleware for request bodies
4. Build a complete CRUD API for a blog (posts, comments)
