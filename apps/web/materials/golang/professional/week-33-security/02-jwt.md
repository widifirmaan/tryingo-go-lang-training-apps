# JWT Implementation

JSON Web Token authentication in Go.

## Token Generation

```go
import "github.com/golang-jwt/jwt/v5"

type Claims struct {
    UserID string   `json:"user_id"`
    Roles  []string `json:"roles"`
    jwt.RegisteredClaims
}

type JWTManager struct {
    secret    []byte
    issuer    string
    expiry    time.Duration
}

func NewJWTManager(secret string, issuer string, expiry time.Duration) *JWTManager {
    return &JWTManager{
        secret: []byte(secret),
        issuer: issuer,
        expiry: expiry,
    }
}

func (m *JWTManager) GenerateToken(userID string, roles []string) (string, error) {
    claims := &Claims{
        UserID: userID,
        Roles:  roles,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(m.expiry)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            Issuer:    m.issuer,
            Subject:   userID,
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(m.secret)
}
```

## Token Validation

```go
func (m *JWTManager) ValidateToken(tokenString string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenString, &Claims{},
        func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("unexpected signing method: %v",
                    token.Header["alg"])
            }
            return m.secret, nil
        },
        jwt.WithIssuer(m.issuer),
        jwt.WithLeeway(30*time.Second),
    )
    if err != nil {
        return nil, err
    }
    claims, ok := token.Claims.(*Claims)
    if !ok || !token.Valid {
        return nil, jwt.ErrSignatureInvalid
    }
    return claims, nil
}
```

## JWT Middleware

```go
func JWTMiddleware(jwtManager *JWTManager) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            authHeader := r.Header.Get("Authorization")
            if authHeader == "" {
                http.Error(w, "missing authorization header", http.StatusUnauthorized)
                return
            }
            parts := strings.Split(authHeader, " ")
            if len(parts) != 2 || parts[0] != "Bearer" {
                http.Error(w, "invalid authorization format", http.StatusUnauthorized)
                return
            }
            claims, err := jwtManager.ValidateToken(parts[1])
            if err != nil {
                http.Error(w, "invalid token", http.StatusUnauthorized)
                return
            }
            ctx := context.WithValue(r.Context(), "claims", claims)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}
```

## Refresh Tokens

```go
type TokenPair struct {
    AccessToken  string `json:"access_token"`
    RefreshToken string `json:"refresh_token"`
}

func (m *JWTManager) GenerateTokenPair(userID string, roles []string) (*TokenPair, error) {
    access, err := m.GenerateToken(userID, roles)
    if err != nil {
        return nil, err
    }
    refresh, err := m.GenerateToken(userID, roles)
    if err != nil {
        return nil, err
    }
    return &TokenPair{AccessToken: access, RefreshToken: refresh}, nil
}
```

## Practice
1. Implement token blacklisting on logout
2. Add RS256 (asymmetric) signing
3. Build a token refresh endpoint
