# Bcrypt Password Hashing

Secure password storage and verification with bcrypt.

## Password Hashing

```go
import "golang.org/x/crypto/bcrypt"

type PasswordService struct {
    cost int
}

func NewPasswordService(cost int) *PasswordService {
    if cost == 0 {
        cost = bcrypt.DefaultCost
    }
    return &PasswordService{cost: cost}
}

func (s *PasswordService) Hash(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), s.cost)
    if err != nil {
        return "", fmt.Errorf("hash password: %w", err)
    }
    return string(bytes), nil
}

func (s *PasswordService) Verify(password, hash string) error {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    if err != nil {
        return ErrInvalidCredentials
    }
    return nil
}

var ErrInvalidCredentials = errors.New("invalid credentials")
```

## User Registration

```go
type UserService struct {
    repo    UserRepository
    hasher  *PasswordService
}

func (s *UserService) Register(ctx context.Context, email, password string) (*User, error) {
    if err := validatePassword(password); err != nil {
        return nil, err
    }
    hash, err := s.hasher.Hash(password)
    if err != nil {
        return nil, err
    }
    user := &User{
        ID:           uuid.New().String(),
        Email:        email,
        PasswordHash: hash,
        CreatedAt:    time.Now(),
    }
    if err := s.repo.Save(ctx, user); err != nil {
        return nil, fmt.Errorf("save user: %w", err)
    }
    return user, nil
}

func validatePassword(password string) error {
    if len(password) < 8 {
        return fmt.Errorf("password must be at least 8 characters")
    }
    if len(password) > 72 {
        return fmt.Errorf("password must be at most 72 characters")
    }
    return nil
}
```

## Login Flow

```go
type AuthService struct {
    users    UserRepository
    hasher   *PasswordService
    sessions SessionStore
}

func (s *AuthService) Login(ctx context.Context, email, password string) (*Session, error) {
    user, err := s.users.FindByEmail(ctx, email)
    if err != nil {
        return nil, ErrInvalidCredentials
    }
    if err := s.hasher.Verify(password, user.PasswordHash); err != nil {
        return nil, ErrInvalidCredentials
    }
    session := &Session{
        Token:     generateSessionToken(),
        UserID:    user.ID,
        ExpiresAt: time.Now().Add(24 * time.Hour),
    }
    if err := s.sessions.Save(ctx, session); err != nil {
        return nil, fmt.Errorf("save session: %w", err)
    }
    return session, nil
}
```

## Upgrade Password Hash Cost

```go
func (s *AuthService) VerifyAndUpgrade(ctx context.Context, userID, password, currentHash string) (string, error) {
    if err := s.hasher.Verify(password, currentHash); err != nil {
        return "", err
    }
    cost, err := bcrypt.Cost([]byte(currentHash))
    if err != nil {
        return "", err
    }
    if cost < bcrypt.DefaultCost {
        newHash, err := s.hasher.Hash(password)
        if err != nil {
            return "", err
        }
        if err := s.repo.UpdatePassword(ctx, userID, newHash); err != nil {
            return "", err
        }
        return newHash, nil
    }
    return currentHash, nil
}
```

## Practice
1. Implement password strength validation
2. Add rate limiting to login endpoint
3. Build a password reset flow
