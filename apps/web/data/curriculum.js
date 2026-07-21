export const curriculum = {
  golang: {
    name: 'Go (Golang)',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'No prior programming experience needed. Start from zero.',
        modules: [
          { id: 'week-01', title: 'Environment & Tools', subtitle: 'Setup your Go development environment', lessons: [
            { id: '01-introduction', title: 'What is Go?' },
            { id: '02-installation', title: 'Installing Go & Setup' },
            { id: '03-hello-world', title: 'Hello, World!' },
            { id: '04-go-mod', title: 'Go Modules & Packages' },
            { id: '05-ide-setup', title: 'IDE & Editor Configuration' }
          ]},
          { id: 'week-02', title: 'Basics', subtitle: 'Variables, types, and constants', lessons: [
            { id: '01-variables', title: 'Variables & Declaration' },
            { id: '02-constants', title: 'Constants & Iota' },
            { id: '03-data-types', title: 'Basic Data Types' },
            { id: '04-zero-values', title: 'Zero Values & Empty Variables' },
            { id: '05-fmt', title: 'Printing & Formatting with fmt' }
          ]},
          { id: 'week-03', title: 'Control Flow', subtitle: 'Making decisions and loops', lessons: [
            { id: '01-if-else', title: 'If/Else Statements' },
            { id: '02-for-loops', title: 'For Loops' },
            { id: '03-switch', title: 'Switch Statements' },
            { id: '04-defer', title: 'Defer & Stacking Defers' }
          ]},
          { id: 'week-04', title: 'Functions', subtitle: 'Write reusable code', lessons: [
            { id: '01-function-basics', title: 'Function Syntax' },
            { id: '02-multiple-returns', title: 'Multiple Return Values' },
            { id: '03-variadic', title: 'Variadic Functions' },
            { id: '04-closures', title: 'Closures & Anonymous Functions' },
            { id: '05-recursion', title: 'Recursion' }
          ]},
          { id: 'week-05', title: 'Data Structures', subtitle: 'Arrays, slices, and maps', lessons: [
            { id: '01-arrays', title: 'Arrays' },
            { id: '02-slices', title: 'Slices' },
            { id: '03-maps', title: 'Maps' },
            { id: '04-range', title: 'Range Keyword' }
          ]},
          { id: 'week-06', title: 'Structs & Methods', subtitle: 'Custom types and behavior', lessons: [
            { id: '01-structs', title: 'Struct Definition & Usage' },
            { id: '02-methods', title: 'Methods' },
            { id: '03-pointers', title: 'Pointers & References' },
            { id: '04-struct-tags', title: 'Struct Tags & Metadata' }
          ]}
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Build on your basics with real-world patterns.',
        modules: [
          { id: 'week-07', title: 'Interfaces', subtitle: 'Define behavior, not types', lessons: [
            { id: '01-interface-basics', title: 'Interface Syntax & Satisfaction' },
            { id: '02-empty-interface', title: 'Empty Interface & Type Assertions' },
            { id: '03-type-switches', title: 'Type Switches' },
            { id: '04-interface-design', title: 'Interface Design Principles' }
          ]},
          { id: 'week-08', title: 'Error Handling', subtitle: 'Handle failures gracefully', lessons: [
            { id: '01-error-interface', title: 'The error Interface' },
            { id: '02-custom-errors', title: 'Custom Error Types' },
            { id: '03-panic-recover', title: 'Panic & Recover' },
            { id: '04-errors-utils', title: 'errors.Is, errors.As & Wrapping' }
          ]},
          { id: 'week-09', title: 'Packages & Modules', subtitle: 'Organize and share code', lessons: [
            { id: '01-module-structure', title: 'Go Module Structure' },
            { id: '02-exporting', title: 'Exported vs Unexported' },
            { id: '03-internal-packages', title: 'Internal Packages' },
            { id: '04-dependency-management', title: 'Dependency Management' }
          ]},
          { id: 'week-10', title: 'File I/O', subtitle: 'Read and write files', lessons: [
            { id: '01-reading-files', title: 'Reading Files' },
            { id: '02-writing-files', title: 'Writing Files' },
            { id: '03-bufio', title: 'Buffered I/O' },
            { id: '04-directories', title: 'Working with Directories' }
          ]},
          { id: 'week-11', title: 'JSON & Encoding', subtitle: 'Serialize and deserialize data', lessons: [
            { id: '01-json-marshal', title: 'JSON Marshaling' },
            { id: '02-json-unmarshal', title: 'JSON Unmarshaling' },
            { id: '03-custom-encoding', title: 'Custom JSON Encoding' },
            { id: '04-other-formats', title: 'XML, CSV & YAML' }
          ]},
          { id: 'week-12', title: 'Time & Dates', subtitle: 'Work with time', lessons: [
            { id: '01-time-basics', title: 'Time Package Basics' },
            { id: '02-formatting', title: 'Formatting & Parsing' },
            { id: '03-durations', title: 'Durations & Sleep' },
            { id: '04-timers-tickers', title: 'Timers & Tickers' }
          ]},
          { id: 'week-13', title: 'Concurrency I', subtitle: 'Goroutines and channels', lessons: [
            { id: '01-goroutines', title: 'Goroutines' },
            { id: '02-channels', title: 'Channels' },
            { id: '03-waitgroup', title: 'Sync WaitGroup' },
            { id: '04-channel-patterns', title: 'Channel Communication Patterns' }
          ]},
          { id: 'week-14', title: 'Concurrency II', subtitle: 'Advanced synchronization', lessons: [
            { id: '01-select', title: 'Select Statement' },
            { id: '02-mutex', title: 'Mutex & RWMutex' },
            { id: '03-once', title: 'Sync.Once' },
            { id: '04-atomic', title: 'Atomic Operations' }
          ]},
          { id: 'week-15', title: 'Context', subtitle: 'Manage cancellation and deadlines', lessons: [
            { id: '01-context-basics', title: 'Context Introduction' },
            { id: '02-cancellation', title: 'Cancellation & Deadlines' },
            { id: '03-context-values', title: 'Context Values' },
            { id: '04-context-patterns', title: 'Real-world Context Patterns' }
          ]},
          { id: 'week-16', title: 'Testing I', subtitle: 'Write tests with confidence', lessons: [
            { id: '01-test-basics', title: 'Writing Tests' },
            { id: '02-table-tests', title: 'Table-Driven Tests' },
            { id: '03-coverage', title: 'Test Coverage' },
            { id: '04-benchmarks', title: 'Benchmarking' }
          ]}
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Master Go\'s advanced features and ecosystems.',
        modules: [
          { id: 'week-17', title: 'HTTP Server', subtitle: 'Build web servers', lessons: [
            { id: '01-net-http', title: 'net/http Package' },
            { id: '02-handlers', title: 'Handlers & ServeMux' },
            { id: '03-middleware', title: 'Middleware Pattern' },
            { id: '04-rest-api', title: 'Building REST API' }
          ]},
          { id: 'week-18', title: 'HTTP Client', subtitle: 'Consume web APIs', lessons: [
            { id: '01-http-client', title: 'HTTP Client Basics' },
            { id: '02-request-config', title: 'Request Configuration' },
            { id: '03-timeouts', title: 'Timeouts & Cancellation' },
            { id: '04-advanced-client', title: 'Advanced Client Patterns' }
          ]},
          { id: 'week-19', title: 'Databases I', subtitle: 'SQL databases with Go', lessons: [
            { id: '01-database-sql', title: 'database/sql' },
            { id: '02-migrations', title: 'Database Migrations' },
            { id: '03-queries', title: 'Queries & Prepared Statements' },
            { id: '04-transactions', title: 'Transactions' }
          ]},
          { id: 'week-20', title: 'Databases II', subtitle: 'ORM and advanced patterns', lessons: [
            { id: '01-gorm-intro', title: 'GORM Introduction' },
            { id: '02-relations', title: 'Relations & Associations' },
            { id: '03-advanced-queries', title: 'Advanced Queries' },
            { id: '04-raw-sql', title: 'Raw SQL & Performance' }
          ]},
          { id: 'week-21', title: 'Templates', subtitle: 'Generate dynamic content', lessons: [
            { id: '01-html-templates', title: 'HTML Templates' },
            { id: '02-template-functions', title: 'Template Functions' },
            { id: '03-template-composition', title: 'Template Composition' },
            { id: '04-text-templates', title: 'Text Templates' }
          ]},
          { id: 'week-22', title: 'Web Frameworks', subtitle: 'Production-ready web apps', lessons: [
            { id: '01-framework-comparison', title: 'Framework Overview' },
            { id: '02-gin', title: 'Gin Framework' },
            { id: '03-echo', title: 'Echo Framework' },
            { id: '04-chi', title: 'Chi Router' }
          ]},
          { id: 'week-23', title: 'Testing II', subtitle: 'Integration and advanced testing', lessons: [
            { id: '01-integration-tests', title: 'Integration Tests' },
            { id: '02-httptest', title: 'HTTP Testing' },
            { id: '03-mocking', title: 'Mocking' },
            { id: '04-fuzzing', title: 'Fuzzing' }
          ]},
          { id: 'week-24', title: 'Advanced Concurrency', subtitle: 'Complex concurrency patterns', lessons: [
            { id: '01-pipelines', title: 'Pipeline Pattern' },
            { id: '02-fan-in-fan-out', title: 'Fan-in / Fan-out' },
            { id: '03-worker-pools', title: 'Worker Pools' },
            { id: '04-generators', title: 'Generator Pattern' }
          ]},
          { id: 'week-25', title: 'Reflection & Generics', subtitle: 'Type parameters and reflection', lessons: [
            { id: '01-generics-intro', title: 'Generics Introduction' },
            { id: '02-type-constraints', title: 'Type Constraints' },
            { id: '03-reflection', title: 'Reflection Basics' },
            { id: '04-reflection-patterns', title: 'Reflection in Practice' }
          ]},
          { id: 'week-26', title: 'Code Quality', subtitle: 'Linting, profiling, optimization', lessons: [
            { id: '01-linting', title: 'golangci-lint & Static Analysis' },
            { id: '02-profiling', title: 'Profiling with pprof' },
            { id: '03-tracing', title: 'Tracing & Debugging' },
            { id: '04-best-practices', title: 'Go Best Practices' }
          ]}
        ]
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'Enterprise-grade Go development.',
        modules: [
          { id: 'week-27', title: 'Microservices', subtitle: 'Architecture and patterns', lessons: [
            { id: '01-microservice-patterns', title: 'Microservice Design Patterns' },
            { id: '02-service-boundaries', title: 'Defining Service Boundaries' },
            { id: '03-grpc-intro', title: 'gRPC & Protocol Buffers' },
            { id: '04-grpc-implementation', title: 'gRPC Service Implementation' }
          ]},
          { id: 'week-28', title: 'Message Queues', subtitle: 'Async communication', lessons: [
            { id: '01-queue-concepts', title: 'Message Queue Concepts' },
            { id: '02-nats', title: 'NATS' },
            { id: '03-rabbitmq', title: 'RabbitMQ' },
            { id: '04-kafka', title: 'Apache Kafka' }
          ]},
          { id: 'week-29', title: 'Docker', subtitle: 'Containerize Go apps', lessons: [
            { id: '01-dockerfile', title: 'Writing Dockerfiles for Go' },
            { id: '02-multistage', title: 'Multi-stage Builds' },
            { id: '03-docker-compose', title: 'Docker Compose' },
            { id: '04-optimization', title: 'Image Optimization' }
          ]},
          { id: 'week-30', title: 'CI/CD', subtitle: 'Automate everything', lessons: [
            { id: '01-github-actions', title: 'GitHub Actions' },
            { id: '02-goreleaser', title: 'GoReleaser' },
            { id: '03-test-automation', title: 'Test Automation' },
            { id: '04-deployment', title: 'Deployment Strategies' }
          ]},
          { id: 'week-31', title: 'Observability', subtitle: 'Monitoring and logging', lessons: [
            { id: '01-structured-logging', title: 'Structured Logging' },
            { id: '02-opentelemetry', title: 'OpenTelemetry' },
            { id: '03-metrics', title: 'Metrics & Monitoring' },
            { id: '04-alerting', title: 'Alerting & Dashboards' }
          ]},
          { id: 'week-32', title: 'Configuration', subtitle: 'Manage configs like a pro', lessons: [
            { id: '01-viper', title: 'Viper Configuration Library' },
            { id: '02-envconfig', title: 'Environment Configuration' },
            { id: '03-feature-flags', title: 'Feature Flags' },
            { id: '04-secrets', title: 'Secrets Management' }
          ]},
          { id: 'week-33', title: 'Security', subtitle: 'Build secure applications', lessons: [
            { id: '01-auth-basics', title: 'Authentication Basics' },
            { id: '02-jwt', title: 'JWT Implementation' },
            { id: '03-bcrypt', title: 'Password Hashing with bcrypt' },
            { id: '04-owasp', title: 'OWASP Top 10 in Go' }
          ]},
          { id: 'week-34', title: 'gRPC Advanced', subtitle: 'Production gRPC', lessons: [
            { id: '01-streaming', title: 'gRPC Streaming' },
            { id: '02-interceptors', title: 'Interceptors & Middleware' },
            { id: '03-load-balancing', title: 'Load Balancing' },
            { id: '04-reflection', title: 'gRPC Reflection & Tooling' }
          ]},
          { id: 'week-35', title: 'GraphQL', subtitle: 'GraphQL APIs in Go', lessons: [
            { id: '01-gqlgen', title: 'gqlgen Setup' },
            { id: '02-resolvers', title: 'Resolvers & Schema' },
            { id: '03-subscriptions', title: 'Subscriptions' },
            { id: '04-production', title: 'Production GraphQL' }
          ]},
          { id: 'week-36', title: 'CGO & WASM', subtitle: 'C interop and WebAssembly', lessons: [
            { id: '01-cgo-basics', title: 'CGO Introduction' },
            { id: '02-calling-c', title: 'Calling C from Go' },
            { id: '03-wasm-intro', title: 'Go & WebAssembly' },
            { id: '04-wasm-dom', title: 'DOM Manipulation with WASM' }
          ]},
          { id: 'week-37', title: 'Distributed Systems', subtitle: 'Building distributed apps', lessons: [
            { id: '01-cap-theorem', title: 'CAP Theorem' },
            { id: '02-consensus', title: 'Consensus Algorithms' },
            { id: '03-raft', title: 'Raft Implementation' },
            { id: '04-distributed-patterns', title: 'Distributed Design Patterns' }
          ]},
          { id: 'week-38-39', title: 'Capstone I', subtitle: 'Architecture & Design', lessons: [
            { id: '01-requirements', title: 'Requirements & Planning' },
            { id: '02-architecture', title: 'System Architecture' },
            { id: '03-api-design', title: 'API Design' },
            { id: '04-database-design', title: 'Database Design' }
          ]},
          { id: 'week-40-41', title: 'Capstone II', subtitle: 'Implementation', lessons: [
            { id: '01-project-setup', title: 'Project Setup' },
            { id: '02-core-features', title: 'Core Feature Implementation' },
            { id: '03-testing', title: 'Testing & Integration' },
            { id: '04-deployment', title: 'Deployment & Monitoring' }
          ]},
          { id: 'week-42', title: 'Code Review', subtitle: 'Review and refactor', lessons: [
            { id: '01-code-review', title: 'Code Review Best Practices' },
            { id: '02-refactoring', title: 'Refactoring Techniques' },
            { id: '03-documentation', title: 'Writing Great Documentation' },
            { id: '04-api-docs', title: 'API Documentation' }
          ]},
          { id: 'week-43', title: 'Deployment', subtitle: 'Production deployment', lessons: [
            { id: '01-kubernetes', title: 'Kubernetes Basics' },
            { id: '02-helm', title: 'Helm Charts' },
            { id: '03-cloudflare-deploy', title: 'Deploying to Cloudflare' },
            { id: '04-production-checklist', title: 'Production Readiness Checklist' }
          ]},
          { id: 'week-44', title: 'Performance', subtitle: 'Optimize Go applications', lessons: [
            { id: '01-profiling-deep', title: 'Deep Dive pprof' },
            { id: '02-memory', title: 'Memory Optimization' },
            { id: '03-concurrency-opt', title: 'Concurrency Optimization' },
            { id: '04-benchmarking', title: 'Advanced Benchmarking' }
          ]},
          { id: 'week-45', title: 'Advanced Patterns', subtitle: 'Enterprise patterns', lessons: [
            { id: '01-di', title: 'Dependency Injection' },
            { id: '02-event-sourcing', title: 'Event Sourcing' },
            { id: '03-cqrs', title: 'CQRS Pattern' },
            { id: '04-clean-architecture', title: 'Clean Architecture' }
          ]},
          { id: 'week-46', title: 'Protocol Buffers', subtitle: 'Deep dive protobuf', lessons: [
            { id: '01-proto3', title: 'Proto3 Language' },
            { id: '02-grpc-gateway', title: 'gRPC Gateway' },
            { id: '03-protoc-plugins', title: 'Protoc Plugins' },
            { id: '04-schema-evolution', title: 'Schema Evolution' }
          ]},
          { id: 'week-47', title: 'Platform Engineering', subtitle: 'Build platforms, not apps', lessons: [
            { id: '01-backstage', title: 'Backstage Developer Portal' },
            { id: '02-service-catalog', title: 'Service Catalogs' },
            { id: '03-internal-tools', title: 'Building Internal Tools' },
            { id: '04-developer-experience', title: 'Developer Experience' }
          ]},
          { id: 'week-48', title: 'Go in the Wild', subtitle: 'Open source & community', lessons: [
            { id: '01-contributing', title: 'Contributing to Open Source' },
            { id: '02-oss-etiquette', title: 'Open Source Etiquette' },
            { id: '03-community', title: 'Go Community' },
            { id: '04-conferences', title: 'Conferences & Events' }
          ]},
          { id: 'week-49', title: 'System Design', subtitle: 'Design distributed systems', lessons: [
            { id: '01-load-balancing', title: 'Load Balancing Strategies' },
            { id: '02-caching', title: 'Caching Strategies' },
            { id: '03-database-sharding', title: 'Database Sharding' },
            { id: '04-cdn-strategy', title: 'CDN & Edge Computing' }
          ]},
          { id: 'week-50', title: 'Interview Prep', subtitle: 'Ace your Go interviews', lessons: [
            { id: '01-algorithms', title: 'Algorithms in Go' },
            { id: '02-concurrency-questions', title: 'Concurrency Questions' },
            { id: '03-system-design', title: 'System Design Questions' },
            { id: '04-behavioral', title: 'Behavioral Questions' }
          ]},
          { id: 'week-51', title: 'Portfolio Building', subtitle: 'Showcase your skills', lessons: [
            { id: '01-github-profile', title: 'GitHub Profile Optimization' },
            { id: '02-blog-posts', title: 'Technical Blog Writing' },
            { id: '03-speaking', title: 'Conference Speaking' },
            { id: '04-portfolio', title: 'Building a Portfolio' }
          ]},
          { id: 'week-52', title: 'Career & Beyond', subtitle: 'Next steps in your journey', lessons: [
            { id: '01-go-roadmap', title: 'Go Ecosystem Roadmap' },
            { id: '02-continued-learning', title: 'Continued Learning' },
            { id: '03-mentorship', title: 'Mentorship & Teaching' },
            { id: '04-community-leadership', title: 'Community Leadership' }
          ]}
        ]
      }
    ]
  },
  html: {
    name: 'HTML5',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'Learn HTML from scratch - no experience needed.',
        modules: [
          { id: 'week-01', title: 'Web Basics', subtitle: 'How the web works', lessons: [
            { id: '01-how-web-works', title: 'How the Internet Works' },
            { id: '02-html-intro', title: 'Introduction to HTML' },
            { id: '03-first-page', title: 'Your First Webpage' },
            { id: '04-tools', title: 'Browser DevTools & Editors' }
          ]},
          { id: 'week-02', title: 'Document Structure', subtitle: 'HTML document anatomy', lessons: [
            { id: '01-doctype', title: 'DOCTYPE & Document Structure' },
            { id: '02-head-element', title: 'The Head Element & Meta Tags' },
            { id: '03-semantic-html', title: 'Semantic HTML Elements' },
            { id: '04-body-structure', title: 'Structuring the Body' }
          ]},
          { id: 'week-03', title: 'Text & Links', subtitle: 'Content and navigation', lessons: [
            { id: '01-headings', title: 'Headings & Paragraphs' },
            { id: '02-anchors', title: 'Links & Anchors' },
            { id: '03-lists', title: 'Ordered & Unordered Lists' },
            { id: '04-quotes', title: 'Quotes & Inline Text' }
          ]},
          { id: 'week-04', title: 'Images & Media', subtitle: 'Visual content', lessons: [
            { id: '01-images', title: 'Images & Alt Text' },
            { id: '02-picture', title: 'Responsive Images with Picture' },
            { id: '03-video', title: 'Video & Audio' },
            { id: '04-iframe', title: 'Iframes & Embeds' }
          ]},
          { id: 'week-05', title: 'Tables & Forms', subtitle: 'Data and user input', lessons: [
            { id: '01-tables', title: 'HTML Tables' },
            { id: '02-form-basics', title: 'Forms & Input Elements' },
            { id: '03-input-types', title: 'Input Types & Attributes' },
            { id: '04-labels', title: 'Labels & Accessibility' }
          ]},
          { id: 'week-06', title: 'CSS Basics', subtitle: 'Style your pages', lessons: [
            { id: '01-css-intro', title: 'CSS Introduction & Selectors' },
            { id: '02-box-model', title: 'Box Model' },
            { id: '03-colors', title: 'Colors & Typography' },
            { id: '04-backgrounds', title: 'Backgrounds & Borders' }
          ]},
          { id: 'week-07', title: 'CSS Layout', subtitle: 'Modern layout techniques', lessons: [
            { id: '01-flexbox', title: 'Flexbox' },
            { id: '02-grid', title: 'CSS Grid' },
            { id: '03-positioning', title: 'Positioning' },
            { id: '04-responsive', title: 'Responsive Design Basics' }
          ]},
          { id: 'week-08', title: 'Project', subtitle: 'Build your portfolio', lessons: [
            { id: '01-planning', title: 'Project Planning' },
            { id: '02-html-structure', title: 'Building HTML Structure' },
            { id: '03-css-styling', title: 'Styling with CSS' },
            { id: '04-responsive-polish', title: 'Responsive & Polish' }
          ]}
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Master modern HTML5 and web APIs.',
        modules: [
          { id: 'week-09', title: 'Forms Advanced', subtitle: 'Complex form patterns', lessons: [
            { id: '01-validation', title: 'Form Validation API' },
            { id: '02-datalist', title: 'Datalist & Output' },
            { id: '03-form-attributes', title: 'Advanced Form Attributes' },
            { id: '04-custom-controls', title: 'Custom Form Controls' }
          ]},
          { id: 'week-10', title: 'Accessibility', subtitle: 'Build for everyone', lessons: [
            { id: '01-aria', title: 'ARIA & Roles' },
            { id: '02-semantics', title: 'Semantic HTML & Accessibility' },
            { id: '03-keyboard', title: 'Keyboard Navigation' },
            { id: '04-screen-readers', title: 'Screen Readers' }
          ]},
          { id: 'week-11', title: 'SEO', subtitle: 'Search engine optimization', lessons: [
            { id: '01-meta-tags', title: 'Meta Tags & Open Graph' },
            { id: '02-structured-data', title: 'Structured Data & JSON-LD' },
            { id: '03-sitemaps', title: 'Sitemaps & Robots.txt' },
            { id: '04-seo-best-practices', title: 'SEO Best Practices' }
          ]},
          { id: 'week-12', title: 'HTML5 APIs I', subtitle: 'Browser APIs', lessons: [
            { id: '01-geolocation', title: 'Geolocation API' },
            { id: '02-drag-drop', title: 'Drag & Drop API' },
            { id: '03-web-storage', title: 'Web Storage API' },
            { id: '04-indexeddb', title: 'IndexedDB' }
          ]},
          { id: 'week-13', title: 'HTML5 APIs II', subtitle: 'Graphics and media', lessons: [
            { id: '01-canvas', title: 'Canvas API' },
            { id: '02-svg', title: 'SVG in HTML' },
            { id: '03-animations', title: 'CSS & JS Animations' },
            { id: '04-web-animations', title: 'Web Animations API' }
          ]},
          { id: 'week-14', title: 'HTML5 APIs III', subtitle: 'Advanced browser APIs', lessons: [
            { id: '01-history', title: 'History API' },
            { id: '02-web-workers', title: 'Web Workers' },
            { id: '03-service-workers', title: 'Service Workers' },
            { id: '04-offline', title: 'Offline Support' }
          ]},
          { id: 'week-15', title: 'Web Components', subtitle: 'Custom elements', lessons: [
            { id: '01-custom-elements', title: 'Custom Elements' },
            { id: '02-shadow-dom', title: 'Shadow DOM' },
            { id: '03-templates', title: 'HTML Templates & Slots' },
            { id: '04-component-patterns', title: 'Component Design Patterns' }
          ]},
          { id: 'week-16', title: 'Modern HTML', subtitle: 'Latest HTML features', lessons: [
            { id: '01-dialog', title: 'Dialog & Popover API' },
            { id: '02-details', title: 'Details & Summary' },
            { id: '03-search', title: 'Search Element' },
            { id: '04-datalist', title: 'Datalist & New Input Types' }
          ]},
          { id: 'week-17', title: 'CSS Modern', subtitle: 'Modern CSS features', lessons: [
            { id: '01-container-queries', title: 'Container Queries' },
            { id: '02-css-layers', title: 'CSS Layers & Cascade' },
            { id: '03-nesting', title: 'CSS Nesting' },
            { id: '04-custom-props', title: 'CSS Custom Properties Advanced' }
          ]},
          { id: 'week-18', title: 'CSS Animations', subtitle: 'Bring pages to life', lessons: [
            { id: '01-transitions', title: 'CSS Transitions' },
            { id: '02-keyframes', title: 'Keyframe Animations' },
            { id: '03-scroll-driven', title: 'Scroll-Driven Animations' },
            { id: '04-performance', title: 'Animation Performance' }
          ]},
          { id: 'week-19', title: 'Performance', subtitle: 'Optimize web performance', lessons: [
            { id: '01-lazy-loading', title: 'Lazy Loading' },
            { id: '02-critical-css', title: 'Critical CSS' },
            { id: '03-resource-hints', title: 'Resource Hints (preload/prefetch)' },
            { id: '04-core-web-vitals', title: 'Core Web Vitals' }
          ]},
          { id: 'week-20', title: 'PWA', subtitle: 'Progressive Web Apps', lessons: [
            { id: '01-manifest', title: 'Web App Manifest' },
            { id: '02-service-worker', title: 'Service Worker Lifecycle' },
            { id: '03-caching-strategies', title: 'Caching Strategies' },
            { id: '04-pwa-features', title: 'PWA Features & Best Practices' }
          ]},
          { id: 'week-21', title: 'Forms & Data', subtitle: 'Advanced form handling', lessons: [
            { id: '01-formdata', title: 'FormData API' },
            { id: '02-validation-api', title: 'Constraint Validation API' },
            { id: '03-custom-validation', title: 'Custom Validation' },
            { id: '04-file-handling', title: 'File Handling & Upload' }
          ]},
          { id: 'week-22', title: 'Testing HTML', subtitle: 'Quality assurance', lessons: [
            { id: '01-validator', title: 'W3C HTML Validation' },
            { id: '02-lighthouse', title: 'Lighthouse Audits' },
            { id: '03-accessibility-tools', title: 'Accessibility Testing (axe-core)' },
            { id: '04-cross-browser', title: 'Cross-Browser Testing' }
          ]},
          { id: 'week-23', title: 'Web Security', subtitle: 'Secure your web apps', lessons: [
            { id: '01-https', title: 'HTTPS & SSL/TLS' },
            { id: '02-csp', title: 'Content Security Policy' },
            { id: '03-cors', title: 'CORS' },
            { id: '04-xss', title: 'XSS Prevention' }
          ]},
          { id: 'week-24', title: 'Capstone', subtitle: 'Build a complete website', lessons: [
            { id: '01-planning-advanced', title: 'Advanced Project Planning' },
            { id: '02-implementation', title: 'Full Implementation' },
            { id: '03-optimization', title: 'Performance & SEO Optimization' },
            { id: '04-launch', title: 'Launch & Monitoring' }
          ]}
        ]
      }
    ]
  }
}
