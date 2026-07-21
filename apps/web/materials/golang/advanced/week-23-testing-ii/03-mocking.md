# Mocking

Mocking replaces real dependencies with test doubles to isolate the code under test.

## Interface-Based Mocking

```go
type UserRepository interface {
    GetByID(id int64) (*User, error)
    Create(user *User) error
    List() ([]User, error)
}

type UserService struct {
    repo UserRepository
}

func (s *UserService) GetUser(id int64) (*User, error) {
    user, err := s.repo.GetByID(id)
    if err != nil {
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return user, nil
}
```

## Manual Mock

```go
type MockUserRepo struct {
    GetByIDFunc func(id int64) (*User, error)
    CreateFunc  func(user *User) error
    ListFunc    func() ([]User, error)
    calls       []string
}

func (m *MockUserRepo) GetByID(id int64) (*User, error) {
    m.calls = append(m.calls, "GetByID")
    if m.GetByIDFunc != nil {
        return m.GetByIDFunc(id)
    }
    return nil, nil
}

func (m *MockUserRepo) Create(user *User) error {
    m.calls = append(m.calls, "Create")
    if m.CreateFunc != nil {
        return m.CreateFunc(user)
    }
    return nil
}

func (m *MockUserRepo) List() ([]User, error) {
    m.calls = append(m.calls, "List")
    if m.ListFunc != nil {
        return m.ListFunc()
    }
    return nil, nil
}
```

## Using the Mock

```go
func TestUserService_GetUser(t *testing.T) {
    mock := &MockUserRepo{
        GetByIDFunc: func(id int64) (*User, error) {
            return &User{ID: id, Name: "John"}, nil
        },
    }
    svc := NewUserService(mock)

    user, err := svc.GetUser(1)
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    if user.Name != "John" {
        t.Errorf("expected 'John', got '%s'", user.Name)
    }

    if len(mock.calls) != 1 || mock.calls[0] != "GetByID" {
        t.Errorf("expected GetByID call, got %v", mock.calls)
    }
}
```

## Using testify/mock

```go
import "github.com/stretchr/testify/mock"

type MockUserRepo struct {
    mock.Mock
}

func (m *MockUserRepo) GetByID(id int64) (*User, error) {
    args := m.Called(id)
    if args.Get(0) == nil {
        return nil, args.Error(1)
    }
    return args.Get(0).(*User), args.Error(1)
}

func (m *MockUserRepo) Create(user *User) error {
    args := m.Called(user)
    return args.Error(0)
}

func TestGetUser(t *testing.T) {
    mockRepo := new(MockUserRepo)
    mockRepo.On("GetByID", int64(1)).Return(&User{ID: 1, Name: "John"}, nil)

    svc := NewUserService(mockRepo)
    user, err := svc.GetUser(1)

    assert.NoError(t, err)
    assert.Equal(t, "John", user.Name)
    mockRepo.AssertExpectations(t)
}
```

## Practice

1. Mock an external payment gateway interface
2. Write tests with mock that returns errors
3. Use testify/mock for a complex service
4. Create a mock that records call order
