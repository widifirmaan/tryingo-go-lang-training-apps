# Secrets Management

Manage secrets securely in Go applications.

## Environment Variables

```go
type SecretManager struct {
    secrets map[string]string
    mu      sync.RWMutex
}

func (s *SecretManager) Get(key string) (string, error) {
    if val, ok := os.LookupEnv(key); ok {
        return val, nil
    }
    return "", fmt.Errorf("secret %s not found", key)
}

func init() {
    // Never log or print secrets
    dbPass := os.Getenv("DB_PASSWORD")
    if dbPass == "" {
        log.Fatal("DB_PASSWORD is required")
    }
}
```

## Encrypted Configuration

```go
import (
    "crypto/aes"
    "crypto/cipher"
    "encoding/base64"
)

type EncryptedConfig struct {
    key []byte
}

func NewEncryptedConfig(key string) *EncryptedConfig {
    hash := sha256.Sum256([]byte(key))
    return &EncryptedConfig{key: hash[:]}
}

func (e *EncryptedConfig) DecryptField(encrypted string) (string, error) {
    data, err := base64.StdEncoding.DecodeString(encrypted)
    if err != nil {
        return "", err
    }
    block, err := aes.NewCipher(e.key)
    if err != nil {
        return "", err
    }
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return "", err
    }
    nonceSize := gcm.NonceSize()
    nonce, ciphertext := data[:nonceSize], data[nonceSize:]
    plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
    return string(plaintext), err
}
```

## AWS Secrets Manager

```go
import (
    "github.com/aws/aws-sdk-go/service/secretsmanager"
    "github.com/aws/aws-sdk-go/aws/session"
)

type AWSSecrets struct {
    client *secretsmanager.SecretsManager
}

func NewAWSSecrets() *AWSSecrets {
    sess := session.Must(session.NewSession())
    return &AWSSecrets{
        client: secretsmanager.New(sess),
    }
}

func (a *AWSSecrets) GetSecret(name string) (string, error) {
    input := &secretsmanager.GetSecretValueInput{
        SecretId: aws.String(name),
    }
    result, err := a.client.GetSecretValue(input)
    if err != nil {
        return "", err
    }
    return aws.StringValue(result.SecretString), nil
}
```

## Prevention of Secret Leakage

```go
// Bad: logging secrets
log.Printf("DB password: %s", dbPass)

// Good: never log sensitive data
log.Printf("Database configured (host=%s)", host)

// Use struct stringer that redacts sensitive fields
type DBCredentials struct {
    Host     string
    Username string
    Password string // never implement String() exposing this
}
```

## Practice
1. Set up AWS Secrets Manager integration
2. Implement secrets rotation with automatic reload
3. Build a secret scanning tool for codebase
