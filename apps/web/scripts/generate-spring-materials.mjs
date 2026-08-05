import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/spring/spring');

const MODULES = [
  { id: 1, f: 'pengenalan-spring', lid: 'Pengenalan Spring Boot & Setup', len: 'Introduction to Spring Boot & Setup', pid: 'Hello Spring', pen: 'Hello Spring' },
  { id: 2, f: 'spring-mvc', lid: 'Spring MVC & Controllers', len: 'Spring MVC & Controllers', pid: 'REST Controllers', pen: 'REST Controllers' },
  { id: 3, f: 'dependency-injection', lid: 'Dependency Injection & Beans', len: 'Dependency Injection & Beans', pid: 'Spring IoC', pen: 'Spring IoC' },
  { id: 4, f: 'data-access', lid: 'Data Access with JPA/Hibernate', len: 'Data Access with JPA/Hibernate', pid: 'Database Access', pen: 'Database Access' },
  { id: 5, f: 'rest-api', lid: 'Building REST APIs', len: 'Building REST APIs', pid: 'API Endpoints', pen: 'API Endpoints' },
  { id: 6, f: 'validation', lid: 'Validation & DTOs', len: 'Validation & DTOs', pid: 'Request Validation', pen: 'Request Validation' },
  { id: 7, f: 'security', lid: 'Spring Security & JWT', len: 'Spring Security & JWT', pid: 'Auth & Security', pen: 'Auth & Security' },
  { id: 8, f: 'data-service', lid: 'Service Layer & Transactions', len: 'Service Layer & Transactions', pid: 'Business Logic', pen: 'Business Logic' },
  { id: 9, f: 'error-handling', lid: 'Exception Handling & Global Errors', len: 'Exception Handling & Global Errors', pid: 'Error Handling', pen: 'Error Handling' },
  { id: 10, f: 'testing', lid: 'Testing with JUnit & Mockito', len: 'Testing with JUnit & Mockito', pid: 'Test Suite', pen: 'Test Suite' },
  { id: 11, f: 'configuration', lid: 'Configuration & Profiles', len: 'Configuration & Profiles', pid: 'App Config', pen: 'App Config' },
  { id: 12, f: 'caching', lid: 'Caching & Performance', len: 'Caching & Performance', pid: 'Optimize Performance', pen: 'Optimize Performance' },
  { id: 13, f: 'messaging', lid: 'Messaging & Async Processing', len: 'Messaging & Async Processing', pid: 'Async Tasks', pen: 'Async Tasks' },
  { id: 14, f: 'microservices', lid: 'Microservices Architecture', len: 'Microservices Architecture', pid: 'Distributed System', pen: 'Distributed System' },
  { id: 15, f: 'deployment', lid: 'Deployment & Docker', len: 'Deployment & Docker', pid: 'Containerize App', pen: 'Containerize App' },
  { id: 16, f: 'capstone', lid: 'Capstone: Spring Boot API', len: 'Capstone: Spring Boot API Project', pid: 'Complete API', pen: 'Complete API' },
];

const OBJ = {
  1: { id: ['Mengenal Spring Boot sebagai framework Java', 'Menginstall Java JDK dan Spring Boot', 'Memahami struktur proyek Spring Boot', 'Membuat aplikasi Spring Boot pertama'], en: ['Understand Spring Boot as a Java framework', 'Install Java JDK and Spring Boot', 'Understand Spring Boot project structure', 'Create your first Spring Boot application'] },
  2: { id: ['Memahami pola MVC di Spring', 'Membuat controller dengan @RestController', 'Menggunakan @GetMapping, @PostMapping, dll', 'Mengembalikan JSON response'], en: ['Understand MVC pattern in Spring', 'Create controller with @RestController', 'Use @GetMapping, @PostMapping, etc.', 'Return JSON response'] },
  3: { id: ['Memahami Dependency Injection dan IoC', 'Menggunakan @Autowired dan constructor injection', 'Memahami bean scope (singleton, prototype)', 'Menggunakan @Component, @Service, @Repository'], en: ['Understand Dependency Injection and IoC', 'Use @Autowired and constructor injection', 'Understand bean scope (singleton, prototype)', 'Use @Component, @Service, @Repository'] },
  4: { id: ['Memahami JPA dan Hibernate', 'Membuat entity dan repository', 'Menggunakan Spring Data JPA', 'Mengkonfigurasi database connection'], en: ['Understand JPA and Hibernate', 'Create entity and repository', 'Use Spring Data JPA', 'Configure database connection'] },
  5: { id: ['Membangun REST API dengan Spring Boot', 'Menggunakan @PathVariable dan @RequestParam', 'Mengimplementasi CRUD operations', 'Menggunakan ResponseEntity untuk status codes'], en: ['Build REST API with Spring Boot', 'Use @PathVariable and @RequestParam', 'Implement CRUD operations', 'Use ResponseEntity for status codes'] },
  6: { id: ['Menggunakan @Valid untuk validasi', 'Membuat DTO (Data Transfer Object)', 'Menggunakan Bean Validation annotations', 'Mengembalikan error messages yang jelas'], en: ['Use @Valid for validation', 'Create DTO (Data Transfer Object)', 'Use Bean Validation annotations', 'Return clear error messages'] },
  7: { id: ['Memahami Spring Security', 'Mengimplementasi JWT authentication', 'Menggunakan role-based authorization', 'Mengkonfigurasi CORS dan CSRF'], en: ['Understand Spring Security', 'Implement JWT authentication', 'Use role-based authorization', 'Configure CORS and CSRF'] },
  8: { id: ['Membuat service layer untuk business logic', 'Menggunakan @Transactional', 'Mengimplementasi service pattern', 'Memisahkan concerns (controller vs service)'], en: ['Create service layer for business logic', 'Use @Transactional', 'Implement service pattern', 'Separate concerns (controller vs service)'] },
  9: { id: ['Membuat custom exception classes', 'Menggunakan @ControllerAdvice untuk global error handling', 'Mengembalikan error response yang terstruktur', 'Menggunakan @ExceptionHandler'], en: ['Create custom exception classes', 'Use @ControllerAdvice for global error handling', 'Return structured error responses', 'Use @ExceptionHandler'] },
  10: { id: ['Menulis unit test dengan JUnit 5', 'Menggunakan Mockito untuk mocking', 'Menggunakan @SpringBootTest untuk integration test', 'Memahami test coverage'], en: ['Write unit tests with JUnit 5', 'Use Mockito for mocking', 'Use @SpringBootTest for integration test', 'Understand test coverage'] },
  11: { id: ['Menggunakan application.properties/yml', 'Mengimplementasi multi-profile configuration', 'Menggunakan @Value dan @ConfigurationProperties', 'Memahami environment variables'], en: ['Use application.properties/yml', 'Implement multi-profile configuration', 'Use @Value and @ConfigurationProperties', 'Understand environment variables'] },
  12: { id: ['Menggunakan Spring Cache abstraction', 'Mengimplementasi caching dengan Caffeine/Redis', 'Menggunakan @Cacheable, @CacheEvict', 'Mengoptimasi query database dengan caching'], en: ['Use Spring Cache abstraction', 'Implement caching with Caffeine/Redis', 'Use @Cacheable, @CacheEvict', 'Optimize DB queries with caching'] },
  13: { id: ['Memahami async processing dengan @Async', 'Menggunakan CompletableFuture', 'Mengimplementasi scheduled tasks', 'Memahami message queues'], en: ['Understand async processing with @Async', 'Use CompletableFuture', 'Implement scheduled tasks', 'Understand message queues'] },
  14: { id: ['Memahami microservices architecture', 'Menggunakan Spring Cloud', 'Mengimplementasi service discovery', 'Menggunakan API Gateway'], en: ['Understand microservices architecture', 'Use Spring Cloud', 'Implement service discovery', 'Use API Gateway'] },
  15: { id: ['Mempersiapkan deployment', 'Membuat Docker container', 'Menggunakan Docker Compose', 'Memahami production configuration'], en: ['Prepare for deployment', 'Create Docker container', 'Use Docker Compose', 'Understand production configuration'] },
  16: { id: ['Menggabungkan semua konsep Spring Boot', 'Membangun REST API lengkap', 'Mengimplementasi security dan testing', 'Mempersiapkan production deployment'], en: ['Combine all Spring Boot concepts', 'Build a complete REST API', 'Implement security and testing', 'Prepare for production deployment'] },
};

const CODE = {
  1: `@SpringBootApplication\npublic class HelloSpringApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(HelloSpringApplication.class, args);\n    }\n}\n\n@RestController\nclass HelloController {\n    @GetMapping("/")\n    public String hello() {\n        return "Hello, Spring Boot!";\n    }\n}`,
  2: `@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n\n    @GetMapping\n    public List<User> getAll() {\n        return userService.findAll();\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<User> getById(@PathVariable Long id) {\n        return userService.findById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @PostMapping\n    public ResponseEntity<User> create(@RequestBody User user) {\n        User saved = userService.save(user);\n        return ResponseEntity\n            .created(URI.create("/api/users/" + saved.getId()))\n            .body(saved);\n    }\n}`,
  3: `@Service\npublic class UserService {\n    private final UserRepository userRepository;\n\n    @Autowired\n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n\n    public List<User> findAll() {\n        return userRepository.findAll();\n    }\n}\n\n@Component\npublic class EmailService {\n    public void sendWelcomeEmail(String to) {\n        System.out.println("Welcome email sent to " + to);\n    }\n}`,
  4: `@Entity\n@Table(name = "users")\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false)\n    private String name;\n\n    @Column(unique = true, nullable = false)\n    private String email;\n\n    // getters and setters\n}\n\n@Repository\npublic interface UserRepository\n    extends JpaRepository<User, Long> {\n    List<User> findByNameContaining(String name);\n}`,
  5: `@RestController\n@RequestMapping("/api/posts")\npublic class PostController {\n\n    @GetMapping\n    public List<Post> list() {\n        return postService.findAll();\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<Post> get(@PathVariable Long id) {\n        return postService.findById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @PostMapping\n    public ResponseEntity<Post> create(@Valid @RequestBody Post post) {\n        Post saved = postService.save(post);\n        return ResponseEntity.created(\n            URI.create("/api/posts/" + saved.getId())\n        ).body(saved);\n    }\n\n    @PutMapping("/{id}")\n    public ResponseEntity<Post> update(\n        @PathVariable Long id,\n        @RequestBody Post post\n    ) {\n        return postService.findById(id)\n            .map(p -> {\n                p.setTitle(post.getTitle());\n                p.setBody(post.getBody());\n                return ResponseEntity.ok(postService.save(p));\n            })\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @DeleteMapping("/{id}")\n    public ResponseEntity<Void> delete(@PathVariable Long id) {\n        postService.delete(id);\n        return ResponseEntity.noContent().build();\n    }\n}`,
  6: `public class CreatePostRequest {\n    @NotBlank(message = "Title is required")\n    @Size(min = 5, max = 200)\n    private String title;\n\n    @NotBlank(message = "Body is required")\n    @Size(min = 10)\n    private String body;\n\n    // getters and setters\n}\n\n@PostMapping\npublic ResponseEntity<Post> create(\n    @Valid @RequestBody CreatePostRequest request\n) {\n    Post post = new Post();\n    post.setTitle(request.getTitle());\n    post.setBody(request.getBody());\n    return ResponseEntity.ok(postService.save(post));\n}`,
  7: `@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n\n    @Bean\n    public SecurityFilterChain filterChain(\n        HttpSecurity http\n    ) throws Exception {\n        http\n            .csrf().disable()\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/auth/**").permitAll()\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(\n                jwtFilter(),\n                UsernamePasswordAuthenticationFilter.class\n            );\n        return http.build();\n    }\n}`,
  8: `@Service\n@Transactional\npublic class PostService {\n    private final PostRepository postRepository;\n\n    public Post createPost(Post post) {\n        return postRepository.save(post);\n    }\n\n    public List<Post> getAllPosts() {\n        return postRepository.findAll();\n    }\n}\n\n@Transactional(readOnly = true)\npublic List<Post> findPublishedPosts() {\n    return postRepository.findByPublishedTrue();\n}`,
  9: `@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse>\n        handleNotFound(ResourceNotFoundException ex) {\n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.NOT_FOUND.value(),\n            ex.getMessage()\n        );\n        return ResponseEntity.status(HttpStatus.NOT_FOUND)\n            .body(error);\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse>\n        handleValidationErrors(\n            MethodArgumentNotValidException ex\n    ) {\n        List<String> errors = ex.getBindingResult()\n            .getFieldErrors().stream()\n            .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())\n            .toList();\n        return ResponseEntity.badRequest()\n            .body(new ErrorResponse(400, errors));\n    }\n}`,
  10: `@SpringBootTest\nclass PostServiceTest {\n\n    @Mock\n    private PostRepository postRepository;\n\n    @InjectMocks\n    private PostService postService;\n\n    @Test\n    void shouldReturnAllPosts() {\n        when(postRepository.findAll())\n            .thenReturn(List.of(new Post(1L, "Title")));\n\n        List<Post> posts = postService.getAllPosts();\n\n        assertEquals(1, posts.size());\n        verify(postRepository).findAll();\n    }\n}`,
  11: `spring:\n  profiles:\n    active: dev\n  datasource:\n    url: jdbc:h2:mem:testdb\n    driver-class-name: org.h2.Driver\n---\nspring:\n  profiles: prod\n  datasource:\n    url: jdbc:postgresql://localhost:5432/proddb`,
  12: `@Configuration\n@EnableCaching\npublic class CacheConfig {\n    @Bean\n    public CacheManager cacheManager() {\n        return new ConcurrentMapCacheManager("users", "posts");\n    }\n}\n\n@Service\npublic class UserService {\n    @Cacheable(value = "users", key = "#id")\n    public User findById(Long id) {\n        return userRepository.findById(id).orElse(null);\n    }\n\n    @CacheEvict(value = "users", key = "#user.id")\n    public void update(User user) {\n        userRepository.save(user);\n    }\n}`,
  13: `@Service\npublic class AsyncService {\n    @Async\n    public CompletableFuture<String> sendNotification(String message) {\n        // Simulate async processing\n        return CompletableFuture.completedFuture("Sent: " + message);\n    }\n\n    @Scheduled(fixedRate = 60000)\n    public void cleanup() {\n        // Run every minute\n        System.out.println("Cleanup job executed");\n    }\n}`,
  14: `// Service Discovery with Eureka\n@EnableEurekaClient\npublic class ServiceApplication { }\n\n// API Gateway\n@EnableGateway\npublic class GatewayApplication {\n    @Bean\n    public RouteLocator routes(RouteLocatorBuilder builder) {\n        return builder.routes()\n            .route("user-service", r -> r\n                .path("/api/users/**")\n                .uri("lb://user-service"))\n            .build();\n    }\n}`,
  15: `FROM eclipse-temurin:17-jdk-alpine\nWORKDIR /app\nCOPY target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]`,
  16: `# Full Spring Boot API\n# - REST endpoints with CRUD\n# - JPA/Hibernate for database\n# - Spring Security with JWT\n# - Validation with Bean Validation\n# - Global exception handling\n# - Caching and async processing\n# - Unit and integration testing\n# - Docker deployment`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. Spring Boot is a Java framework for building enterprise applications. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> Spring Boot | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```java\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'Spring Boot adalah framework Java yang menyederhanakan pengembangan aplikasi enterprise.\nSpring Boot menggunakan konsep Dependency Injection dan auto-configuration.\nSpring MVC menangani request HTTP dan mengembalikan response JSON.\nSpring Data JPA menyederhanakan operasi database dengan repository pattern.'
      : 'Spring Boot is a Java framework that simplifies enterprise application development.\nSpring Boot uses Dependency Injection and auto-configuration concepts.\nSpring MVC handles HTTP requests and returns JSON responses.\nSpring Data JPA simplifies database operations with the repository pattern.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah endpoint dan jalankan aplikasi' : 'Change the endpoint and run the application') + '\n'
    + '- ' + (isId ? 'Tambah entity baru dengan relasi' : 'Add a new entity with relationships') + '\n'
    + '- ' + (isId ? 'Coba tambah Spring Security untuk authentication' : 'Try adding Spring Security for authentication') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat aplikasi Spring Boot REST API lengkap dengan CRUD, validation, dan authentication.\nJalankan dengan: ./mvnw spring-boot:run'
      : 'Build a complete Spring Boot REST API with CRUD, validation, and authentication.\nRun with: ./mvnw spring-boot:run')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' Spring Boot curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);