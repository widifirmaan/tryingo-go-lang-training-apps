# Viper

Multi-source configuration management with Viper.

## Basic Setup

```go
import "github.com/spf13/viper"

type Config struct {
    Server   ServerConfig   `mapstructure:"server"`
    Database DatabaseConfig `mapstructure:"database"`
    Redis    RedisConfig    `mapstructure:"redis"`
    Logging  LoggingConfig  `mapstructure:"logging"`
}

type ServerConfig struct {
    Port    int    `mapstructure:"port"`
    Host    string `mapstructure:"host"`
    Timeout int    `mapstructure:"timeout"`
}

func LoadConfig(path string) (*Config, error) {
    viper.SetConfigName("config")
    viper.SetConfigType("yaml")
    viper.AddConfigPath(path)
    viper.AddConfigPath(".")

    viper.SetEnvPrefix("MYAPP")
    viper.AutomaticEnv()
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return nil, err
        }
    }
    var cfg Config
    if err := viper.Unmarshal(&cfg); err != nil {
        return nil, err
    }
    return &cfg, nil
}
```

## Configuration File

```yaml
# config.yaml
server:
  port: 8080
  host: "0.0.0.0"
  timeout: 30

database:
  host: "localhost"
  port: 5432
  name: "myapp"
  user: "appuser"
  password: "${DB_PASSWORD}"

redis:
  addresses: ["localhost:6379"]
  password: ""
  db: 0

logging:
  level: "info"
  format: "json"
```

## Advanced Viper Usage

```go
func ConfigureViper() {
    // Config file watching
    viper.WatchConfig()
    viper.OnConfigChange(func(e fsnotify.Event) {
        slog.Info("config file changed", "file", e.Name)
    })

    // Bind to environment variables
    viper.BindEnv("database.password", "DB_PASSWORD")
    viper.BindEnv("aws.access_key", "AWS_ACCESS_KEY_ID")

    // Default values
    viper.SetDefault("server.port", 3000)
    viper.SetDefault("logging.level", "debug")

    // Remote config provider
    viper.AddRemoteProvider("etcd3", "http://localhost:2379", "/config/myapp")
    viper.SetConfigType("yaml")
}
```

## Practice
1. Set up Viper with YAML, env, and remote config sources
2. Implement configuration validation with struct tags
3. Add config file hot-reloading
