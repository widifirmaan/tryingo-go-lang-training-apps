import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// SPRING BOOT CURRICULUM — pure research, zero framework influence
// Sources: Official Spring Docs, Baeldung, Spring in Action, Amigoscode,
//          Java Brains, Spring Boot Tutorial (Dan Vega), Reflectoring
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 14 weeks total
//   Beginner (5w): setup → DI → controllers → JPA → REST
//   Intermediate (5w): security → testing → validation → actuator → messaging
//   Advanced (4w): caching → async → deployment → project
// Total: 14 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('spring', 'Spring Boot');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental Spring Boot: setup, DI, controller, JPA, REST API — urutan resmi Spring Docs.',
    descEn: 'Spring Boot fundamentals: setup, DI, controllers, JPA, REST API — official Spring Docs order.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Spring Boot production: security, testing, validation, actuator, messaging — Baeldung pathway.',
    descEn: 'Production Spring Boot: security, testing, validation, actuator, messaging — Baeldung pathway.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Spring Boot expert: caching, async, deployment, microservices, capstone project.',
    descEn: 'Spring Boot expert: caching, async, deployment, microservices, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-5) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-dan-proyek',
    titleId: 'Setup & Proyek Pertama', titleEn: 'Setup & First Project',
    programId: 'Halo, Spring Boot!', programEn: 'Hello, Spring Boot!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'java',
    code: `// File: src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("Spring Boot berjalan di port 8080!");
    }

    @GetMapping("/")
    public String hello() {
        return "Selamat datang di Spring Boot!";
    }

    @GetMapping("/info")
    public String info() {
        return "Spring Boot 3.x + Java 17 + Spring Framework 6";
    }
}

// File: pom.xml (konseptual)
/*
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
*/

// File: src/main/resources/application.properties
/*
server.port=8080
spring.application.name=demo-app
*/

// CLI Commands:
// mvn spring-boot:run
// curl http://localhost:8080/
// curl http://localhost:8080/info`,
    objectivesId: [
      'Memahami Spring Boot sebagai framework Java untuk enterprise application',
      'Setup proyek dengan Spring Initializr atau CLI',
      'Memahami anotasi: @SpringBootApplication, @RestController, @GetMapping',
      'Struktur proyek: src/main/java, src/main/resources, pom.xml',
      'Menjalankan aplikasi: mvn spring-boot:run',
    ],
    objectivesEn: [
      'Understand Spring Boot as a Java framework for enterprise applications',
      'Set up projects with Spring Initializr or CLI',
      'Understand annotations: @SpringBootApplication, @RestController, @GetMapping',
      'Project structure: src/main/java, src/main/resources, pom.xml',
      'Run applications: mvn spring-boot:run',
    ],
    explanationId: '### Spring Boot\nFramework Java untuk build production-ready applications. Auto-configuration, embedded server, opinionated defaults.\n\n### @SpringBootApplication\nGabungan dari @Configuration, @EnableAutoConfiguration, @ComponentScan.\n\n### @RestController\nGabungan @Controller + @ResponseBody. Return data langsung (JSON).\n\n### @GetMapping\nMapping HTTP GET ke method. Bisa spesifik path.\n\n### Struktur Proyek\n- src/main/java: source code\n- src/main/resources: config, static files\n- pom.xml: Maven dependencies\n\n### CLI\n`mvn spring-boot:run` atau `./mvnw spring-boot:run`',
    explanationEn: '### Spring Boot\nJava framework for production-ready applications with auto-configuration.\n\n### @SpringBootApplication\nCombines configuration, auto-configuration, and component scanning.\n\n### @RestController\nReturns data directly as JSON.\n\n### @GetMapping\nMaps HTTP GET requests to handler methods.\n\n### Project Structure\nStandard Maven layout with src/main/java and resources.\n\n### CLI\nRun with mvn spring-boot:run.',
    experimentsId: [
      'Buat endpoint baru dengan @GetMapping("/hello")',
      'Ubah port di application.properties',
      'Tambah @PostMapping endpoint',
      'Coba @PathVariable untuk dynamic URL',
      'Buat response JSON dengan Map',
    ],
    experimentsEn: [
      'Create new endpoint with @GetMapping("/hello")',
      'Change port in application.properties',
      'Add @PostMapping endpoint',
      'Try @PathVariable for dynamic URLs',
      'Create JSON response with Map',
    ],
    challengeId: 'Buat REST API sederhana: endpoint /products (GET), /products/{id} (GET), /products (POST). Gunakan List in-memory.',
    challengeEn: 'Build a simple REST API: endpoint /products (GET), /products/{id} (GET), /products (POST). Use in-memory List.',
    summaryId: 'Minggu 1 dari 14: **Setup & Proyek Pertama** (Level: Pemula). Spring Boot memberikan rapid development. Minggu depan: **Dependency Injection**.',
    summaryEn: 'Week 1 of 14: **Setup & First Project** (Level: Beginner). Spring Boot enables rapid development. Next week: **Dependency Injection**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'dependency-injection',
    titleId: 'Dependency Injection', titleEn: 'Dependency Injection',
    programId: 'Service & Repository', programEn: 'Service & Repository',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'java',
    code: `// File: Product.java (Model)
package com.example.demo.model;

public class Product {
    private Long id;
    private String name;
    private Double price;

    public Product() {}
    public Product(Long id, String name, Double price) {
        this.id = id; this.name = name; this.price = price;
    }

    // Getters dan Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

// File: ProductRepository.java
package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class ProductRepository {
    private final Map<Long, Product> products = new HashMap<>();
    private Long nextId = 1L;

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(nextId++);
        }
        products.put(product.getId(), product);
        return product;
    }

    public void deleteById(Long id) {
        products.remove(id);
    }
}

// File: ProductService.java
package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

// Anotasi DI:
// @Component — generic stereotype
// @Service — business logic
// @Repository — data access
// @Controller / @RestController — web layer
// @Autowired — inject dependency`,
    objectivesId: [
      'Dependency Injection: inject dependency dari luar',
      'Anotasi stereotype: @Component, @Service, @Repository, @Controller',
      'Constructor injection dengan @Autowired',
      'Layered architecture: Controller → Service → Repository',
      'Inversion of Control (IoC) container',
    ],
    objectivesEn: [
      'Dependency Injection: inject dependencies from outside',
      'Stereotype annotations: @Component, @Service, @Repository, @Controller',
      'Constructor injection with @Autowired',
      'Layered architecture: Controller → Service → Repository',
      'Inversion of Control (IoC) container',
    ],
    explanationId: '### Dependency Injection\nSpring mengelola dependency antar class. Tidak perlu `new` manual.\n\n### Stereotype Annotations\n- @Component: generic Spring bean\n- @Service: business logic layer\n- @Repository: data access layer\n- @Controller: web layer\n\n### Constructor Injection\n`@Autowired` pada constructor. Preferred field injection.\n\n### IoC Container\nApplicationContext mengelola lifecycle bean. Singleton by default.\n\n### Layered Architecture\nController → Service → Repository → Database. Separation of concerns.',
    explanationEn: '### Dependency Injection\nSpring manages dependencies between classes. No manual instantiation.\n\n### Stereotype Annotations\n@Component, @Service, @Repository, @Controller for different layers.\n\n### Constructor Injection\nPreferred way to inject dependencies.\n\n### IoC Container\nApplicationContext manages bean lifecycle.\n\n### Layered Architecture\nController → Service → Repository for separation of concerns.',
    experimentsId: [
      'Buat service baru dengan @Service',
      'Eksperimen dengan field injection vs constructor injection',
      'Buat repository dengan @Repository',
      'Coba @Qualifier untuk multiple bean',
      'Eksperimen dengan @Scope("prototype")',
    ],
    experimentsEn: [
      'Create new service with @Service',
      'Experiment with field vs constructor injection',
      'Create repository with @Repository',
      'Try @Qualifier for multiple beans',
      'Experiment with @Scope("prototype")',
    ],
    challengeId: 'Buat sistem manajemen buku: Model Book, Repository, Service, Controller. Gunakan constructor injection.',
    challengeEn: 'Build a book management system: Model Book, Repository, Service, Controller. Use constructor injection.',
    summaryId: 'Minggu 2 dari 14: **Dependency Injection** (Level: Pemula). Inti dari Spring Framework. Minggu depan: **REST Controller**.',
    summaryEn: 'Week 2 of 14: **Dependency Injection** (Level: Beginner). Core of Spring Framework. Next week: **REST Controllers**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'rest-controller',
    titleId: 'REST Controller', titleEn: 'REST Controllers',
    programId: 'CRUD API', programEn: 'CRUD API',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'java',
    code: `// File: ProductController.java
package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/products
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {
        product.setId(id);
        Product updated = productService.createProduct(product);
        return ResponseEntity.ok(updated);
    }

    // DELETE /api/products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

// HTTP Status Codes:
// 200 OK — sukses
// 201 Created — resource baru dibuat
// 204 No Content — sukses tanpa body
// 404 Not Found — resource tidak ditemukan
// 400 Bad Request — input tidak valid
// 500 Internal Server Error — error server`,
    objectivesId: [
      '@RestController dan @RequestMapping untuk define endpoint',
      '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping',
      '@PathVariable untuk URL parameter, @RequestBody untuk request body',
      'ResponseEntity untuk kontrol HTTP status code',
      'RESTful API design: resource-based URL, HTTP methods',
    ],
    objectivesEn: [
      '@RestController and @RequestMapping for endpoint definition',
      '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping',
      '@PathVariable for URL parameters, @RequestBody for request body',
      'ResponseEntity for HTTP status code control',
      'RESTful API design: resource-based URLs, HTTP methods',
    ],
    explanationId: '### @RestController\nGabungan @Controller + @ResponseBody. Return JSON langsung.\n\n### HTTP Method Mapping\n- @GetMapping: baca data\n- @PostMapping: buat data baru\n- @PutMapping: update data\n- @DeleteMapping: hapus data\n\n### @PathVariable\n`@GetMapping("/{id}")` + `@PathVariable Long id` — ambil dari URL.\n\n### @RequestBody\n`@RequestBody Product product` — parse JSON body ke object.\n\n### ResponseEntity\nKontrol penuh: status code, headers, body.',
    explanationEn: '### @RestController\nReturns JSON directly without view resolution.\n\n### HTTP Method Mapping\nGET for read, POST for create, PUT for update, DELETE for delete.\n\n### @PathVariable\nExtract values from URL path.\n\n### @RequestBody\nParse JSON request body to Java object.\n\n### ResponseEntity\nFull control over HTTP response.',
    experimentsId: [
      'Tambah endpoint dengan query parameter',
      'Buat endpoint dengan @RequestParam',
      'Coba ResponseEntity dengan custom header',
      'Buat endpoint untuk search/filter',
      'Eksperimen dengan pagination',
    ],
    experimentsEn: [
      'Add endpoint with query parameters',
      'Create endpoint with @RequestParam',
      'Try ResponseEntity with custom headers',
      'Create endpoint for search/filter',
      'Experiment with pagination',
    ],
    challengeId: 'Buat REST API lengkap untuk Task Manager: CRUD endpoints, proper HTTP status codes, ResponseEntity.',
    challengeEn: 'Build a complete REST API for Task Manager: CRUD endpoints, proper HTTP status codes, ResponseEntity.',
    summaryId: 'Minggu 3 dari 14: **REST Controller** (Level: Pemula). Web layer di Spring Boot. Minggu depan: **Spring Data JPA**.',
    summaryEn: 'Week 3 of 14: **REST Controllers** (Level: Beginner). Web layer in Spring Boot. Next week: **Spring Data JPA**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'spring-data-jpa',
    titleId: 'Spring Data JPA', titleEn: 'Spring Data JPA',
    programId: 'Database Integration', programEn: 'Database Integration',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'java',
    code: `// File: Product.java (Entity)
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    private Integer stock;

    // Constructors, getters, setters
    public Product() {}
    public Product(String name, Double price) {
        this.name = name; this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}

// File: ProductRepository.java
package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Derived query methods
    List<Product> findByName(String name);
    List<Product> findByPriceGreaterThan(Double price);
    List<Product> findByNameContaining(String keyword);

    // Custom query
    @Query("SELECT p FROM Product p WHERE p.price < :maxPrice")
    List<Product> findCheaperThan(@Param("maxPrice") Double maxPrice);
}

// File: application.properties
/*
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
*/`,
    objectivesId: [
      '@Entity dan @Table untuk mapping class ke database table',
      '@Id, @GeneratedValue, @Column untuk mapping field',
      'JpaRepository<T, ID> sebagai base interface',
      'Derived query methods: findByName, findByPriceGreaterThan',
      '@Query untuk custom JPQL query',
    ],
    objectivesEn: [
      '@Entity and @Table for class-to-table mapping',
      '@Id, @GeneratedValue, @Column for field mapping',
      'JpaRepository<T, ID> as base interface',
      'Derived query methods: findByName, findByPriceGreaterThan',
      '@Query for custom JPQL queries',
    ],
    explanationId: '### JPA Entity\n`@Entity` — class dipetakan ke table. `@Table` — custom table name.\n\n### Field Mapping\n`@Id` primary key. `@GeneratedValue` auto-increment. `@Column` column properties.\n\n### JpaRepository\nInterface yang extend JpaRepository otomatis punya: save, findById, findAll, delete.\n\n### Derived Query\nMethod name di-parse jadi query: `findByName` → `SELECT * FROM products WHERE name = ?`.\n\n### @Query\nCustom JPQL: `@Query("SELECT p FROM Product p WHERE p.price < :maxPrice")`.',
    explanationEn: '### JPA Entity\nMap Java classes to database tables with @Entity.\n\n### Field Mapping\n@Id for primary key, @GeneratedValue for auto-increment.\n\n### JpaRepository\nInterface providing CRUD operations automatically.\n\n### Derived Queries\nMethod names are parsed into SQL queries.\n\n### @Query\nCustom JPQL queries with named parameters.',
    experimentsId: [
      'Buat entity baru dengan relasi @OneToMany',
      'Eksperimen dengan derived query methods',
      'Coba @Query dengan JOIN',
      'Buat pagination dengan Pageable',
      'Eksperimen dengan @ManyToOne relasi',
    ],
    experimentsEn: [
      'Create new entity with @OneToMany relationship',
      'Experiment with derived query methods',
      'Try @Query with JOIN',
      'Create pagination with Pageable',
      'Experiment with @ManyToOne relationships',
    ],
    challengeId: 'Buat sistem blog: Entity Post, Comment, User. Relasi @OneToMany, @ManyToOne. Repository dengan custom query.',
    challengeEn: 'Build a blog system: Entity Post, Comment, User. Relationships @OneToMany, @ManyToOne. Repository with custom queries.',
    summaryId: 'Minggu 4 dari 14: **Spring Data JPA** (Level: Pemula). Database access tanpa SQL manual. Minggu depan: **REST API Best Practices**.',
    summaryEn: 'Week 4 of 14: **Spring Data JPA** (Level: Beginner). Database access without manual SQL. Next week: **REST API Best Practices**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'rest-api-best-practices',
    titleId: 'REST API Best Practices', titleEn: 'REST API Best Practices',
    programId: 'DTO & Exception Handling', programEn: 'DTO & Exception Handling',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'java',
    code: `// File: ProductDTO.java
package com.example.demo.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private Double price;

    public ProductDTO() {}
    public ProductDTO(Long id, String name, Double price) {
        this.id = id; this.name = name; this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

// File: ProductNotFoundException.java
package com.example.demo.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Product not found with id: " + id);
    }
}

// File: GlobalExceptionHandler.java
package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "status", 404,
            "error", "Not Found",
            "message", ex.getMessage()
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "status", 500,
            "error", "Internal Server Error",
            "message", ex.getMessage()
        ));
    }
}

// File: ProductController.java (updated)
/*
@GetMapping("/{id}")
public ProductDTO getProduct(@PathVariable Long id) {
    return productService.getProductById(id)
        .orElseThrow(() -> new ProductNotFoundException(id));
}
*/

// Best Practices:
// 1. Gunakan DTO untuk request/response
// 2. Global exception handling dengan @RestControllerAdvice
// 3. Proper HTTP status codes
// 4. Consistent error response format
// 5. Versioning: /api/v1/products`,
    objectivesId: [
      'DTO (Data Transfer Object) untuk request/response',
      '@RestControllerAdvice untuk global exception handling',
      'Custom exception class dengan RuntimeException',
      'Consistent error response format',
      'API versioning: /api/v1/products',
    ],
    objectivesEn: [
      'DTO (Data Transfer Object) for request/response',
      '@RestControllerAdvice for global exception handling',
      'Custom exception classes with RuntimeException',
      'Consistent error response format',
      'API versioning: /api/v1/products',
    ],
    explanationId: '### DTO\nPisahkan entity dari request/response. DTO hanya berisi data yang perlu dikirim.\n\n### @RestControllerAdvice\nGlobal exception handler. Handle semua exception dari controller.\n\n### Custom Exception\nExtend RuntimeException. Throw di service layer.\n\n### Error Response\nFormat konsisten: timestamp, status, error, message.\n\n### API Versioning\n`/api/v1/products` — versioning untuk backward compatibility.',
    explanationEn: '### DTO\nSeparate entities from request/response objects.\n\n### @RestControllerAdvice\nGlobal exception handler for all controllers.\n\n### Custom Exceptions\nDomain-specific exceptions extending RuntimeException.\n\n### Error Response\nConsistent JSON error format.\n\n### API Versioning\nVersion endpoints for backward compatibility.',
    experimentsId: [
      'Buat DTO untuk request dan response berbeda',
      'Tambah exception handler untuk validation error',
      'Coba @ExceptionHandler untuk multiple exception',
      'Buat custom error response class',
      'Eksperimen dengan API versioning',
    ],
    experimentsEn: [
      'Create separate DTOs for request and response',
      'Add exception handler for validation errors',
      'Try @ExceptionHandler for multiple exceptions',
      'Create custom error response class',
      'Experiment with API versioning',
    ],
    challengeId: 'Buat REST API dengan DTO, exception handling, dan versioning. Domain: Task Manager atau E-Commerce.',
    challengeEn: 'Build a REST API with DTOs, exception handling, and versioning. Domain: Task Manager or E-Commerce.',
    summaryId: 'Minggu 5 dari 14: **REST API Best Practices** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Spring Security** (Intermediate).',
    summaryEn: 'Week 5 of 14: **REST API Best Practices** (Level: Beginner). Beginner phase complete! Next week: **Spring Security** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 6-10) ──────────────────────────────────────────────
  {
    week: 6, level: 'intermediate', topicId: 'spring-security',
    titleId: 'Spring Security', titleEn: 'Spring Security',
    programId: 'Auth & JWT', programEn: 'Auth & JWT',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'java',
    code: `// File: SecurityConfig.java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").authenticated()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

// File: JwtUtil.java (konseptual)
/*
@Component
public class JwtUtil {
    private String SECRET_KEY = "rahasia";

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
            .parseClaimsJws(token).getBody().getSubject();
    }
}
*/

// File: AuthController.java
/*
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validasi credentials
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Simpan user baru
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered");
    }
}
*/

// Dependencies (pom.xml):
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
*/`,
    objectivesId: [
      'Spring Security: authentication dan authorization',
      'SecurityFilterChain configuration',
      'JWT (JSON Web Token) untuk stateless auth',
      'Login dan register endpoint',
      'Role-based access control: @PreAuthorize',
    ],
    objectivesEn: [
      'Spring Security: authentication and authorization',
      'SecurityFilterChain configuration',
      'JWT (JSON Web Token) for stateless auth',
      'Login and register endpoints',
      'Role-based access control: @PreAuthorize',
    ],
    explanationId: `### Spring Security\nFramework untuk authentication dan authorization. Filter chain pattern.\n\n### SecurityFilterChain\nKonfigurasi security: CSRF, session, authorization rules.\n\n### JWT\nToken-based auth. Stateless — server tidak simpan session.\n\n### Flow\n1. Client login → server return JWT\n2. Client kirim JWT di header\n3. Server validate JWT\n4. Grant/deny access\n\n### Role-Based\n\`@PreAuthorize("hasRole('ADMIN')")\` — restrict by role.`,
    explanationEn: '### Spring Security\nAuthentication and authorization framework.\n\n### SecurityFilterChain\nConfigure security rules and filters.\n\n### JWT\nStateless token-based authentication.\n\n### Flow\nLogin → JWT → Validate → Access control.\n\n### Role-Based Access\nRestrict endpoints by user roles.',
    experimentsId: [
      'Buat endpoint dengan role-based access',
      'Eksperimen dengan JWT expiration',
      'Coba refresh token flow',
      'Buat custom UserDetailsService',
      'Eksperimen dengan method-level security',
    ],
    experimentsEn: [
      'Create endpoint with role-based access',
      'Experiment with JWT expiration',
      'Try refresh token flow',
      'Create custom UserDetailsService',
      'Experiment with method-level security',
    ],
    challengeId: 'Buat sistem auth lengkap: register, login, JWT, role-based access (USER, ADMIN). Protect endpoints.',
    challengeEn: 'Build a complete auth system: register, login, JWT, role-based access (USER, ADMIN). Protect endpoints.',
    summaryId: 'Minggu 6 dari 14: **Spring Security** (Level: Menengah). Keamanan aplikasi web. Minggu depan: **Testing**.',
    summaryEn: 'Week 6 of 14: **Spring Security** (Level: Intermediate). Web application security. Next week: **Testing**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'testing',
    titleId: 'Testing', titleEn: 'Testing',
    programId: 'Unit & Integration Test', programEn: 'Unit & Integration Tests',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'java',
    code: `// File: ProductServiceTest.java
package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldReturnProductById() {
        // Arrange
        Product product = new Product("Laptop", 15000000.0);
        product.setId(1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // Act
        Optional<Product> result = productService.getProductById(1L);

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Laptop");
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void shouldReturnEmptyWhenProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Product> result = productService.getProductById(99L);

        assertThat(result).isEmpty();
    }
}

// File: ProductControllerTest.java
/*
@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    void shouldReturnProduct() throws Exception {
        Product product = new Product("Laptop", 15000000.0);
        when(productService.getProductById(1L)).thenReturn(Optional.of(product));

        mockMvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Laptop"));
    }
}
*/

// File: ProductRepositoryTest.java
/*
@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldSaveProduct() {
        Product product = new Product("Mouse", 250000.0);
        Product saved = productRepository.save(product);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Mouse");
    }
}
*/

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
*/`,
    objectivesId: [
      'Unit test dengan JUnit 5 dan Mockito',
      '@Mock dan @InjectMocks untuk mock dependency',
      '@WebMvcTest untuk test controller layer',
      '@DataJpaTest untuk test repository layer',
      'AssertJ untuk fluent assertions',
    ],
    objectivesEn: [
      'Unit tests with JUnit 5 and Mockito',
      '@Mock and @InjectMocks for mocking dependencies',
      '@WebMvcTest for testing controller layer',
      '@DataJpaTest for testing repository layer',
      'AssertJ for fluent assertions',
    ],
    explanationId: '### Unit Test\nTest individual components. Mock dependencies dengan Mockito.\n\n### @Mock & @InjectMocks\n`@Mock` — buat mock object. `@InjectMocks` — inject mock ke class yang di-test.\n\n### @WebMvcTest\nTest controller layer tanpa start full server. Gunakan MockMvc.\n\n### @DataJpaTest\nTest repository layer dengan in-memory database.\n\n### AssertJ\nFluent assertions: `assertThat(x).isEqualTo(y).isNotNull()`.',
    explanationEn: '### Unit Tests\nTest individual components with mocked dependencies.\n\n### @Mock & @InjectMocks\nCreate mocks and inject them into test subjects.\n\n### @WebMvcTest\nTest controllers without starting full server.\n\n### @DataJpaTest\nTest repositories with in-memory database.\n\n### AssertJ\nFluent assertion library.',
    experimentsId: [
      'Buat test untuk service method lain',
      'Eksperimen dengan @MockBean di @WebMvcTest',
      'Coba integration test dengan @SpringBootTest',
      'Buat test untuk exception handling',
      'Eksperimen dengan parameterized test',
    ],
    experimentsEn: [
      'Create tests for other service methods',
      'Experiment with @MockBean in @WebMvcTest',
      'Try integration tests with @SpringBootTest',
      'Create tests for exception handling',
      'Experiment with parameterized tests',
    ],
    challengeId: 'Buat test suite lengkap untuk Product API: unit test service, integration test repository, controller test dengan MockMvc.',
    challengeEn: 'Build a complete test suite for Product API: unit test service, integration test repository, controller test with MockMvc.',
    summaryId: 'Minggu 7 dari 14: **Testing** (Level: Menengah). Kualitas kode dan keandalan. Minggu depan: **Validation**.',
    summaryEn: 'Week 7 of 14: **Testing** (Level: Intermediate). Code quality and reliability. Next week: **Validation**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'validation',
    titleId: 'Validation', titleEn: 'Validation',
    programId: 'Bean Validation', programEn: 'Bean Validation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'java',
    code: `// File: Product.java (dengan validation)
package com.example.demo.model;

import jakarta.validation.constraints.*;

public class Product {

    private Long id;

    @NotBlank(message = "Nama tidak boleh kosong")
    @Size(min = 2, max = 100, message = "Nama harus 2-100 karakter")
    private String name;

    @NotNull(message = "Harga tidak boleh null")
    @DecimalMin(value = "0.0", message = "Harga harus positif")
    private Double price;

    @Min(value = 0, message = "Stok tidak boleh negatif")
    private Integer stock;

    // Constructors, getters, setters
    public Product() {}
    public Product(String name, Double price) {
        this.name = name; this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}

// File: ProductController.java (dengan validation)
/*
@PostMapping
public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
    Product created = productService.createProduct(product);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
*/

// File: GlobalExceptionHandler.java (validation handler)
/*
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage()));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
        "timestamp", LocalDateTime.now().toString(),
        "status", 400,
        "errors", errors
    ));
}
*/

// Validation Annotations:
// @NotNull — tidak boleh null
// @NotBlank — tidak boleh null/kosong/whitespace
// @Size — panjang string/collection
// @Min, @Max — batas numerik
// @Email — format email
// @Pattern — regex pattern
// @Valid — trigger validation`,
    objectivesId: [
      'Bean Validation dengan Jakarta annotations',
      '@NotNull, @NotBlank, @Size, @Min, @Max',
      '@Valid untuk trigger validation di controller',
      'MethodArgumentNotValidException handler',
      'Custom validation message',
    ],
    objectivesEn: [
      'Bean Validation with Jakarta annotations',
      '@NotNull, @NotBlank, @Size, @Min, @Max',
      '@Valid to trigger validation in controllers',
      'MethodArgumentNotValidException handler',
      'Custom validation messages',
    ],
    explanationId: '### Bean Validation\nValidasi input dengan annotations. Jakarta Bean Validation 3.0.\n\n### Annotations\n- @NotNull: tidak boleh null\n- @NotBlank: tidak boleh null/kosong\n- @Size: panjang string\n- @Min/@Max: batas numerik\n\n### @Valid\nTrigger validation di controller method parameter.\n\n### Exception Handler\n`MethodArgumentNotValidException` — handle validation errors. Extract field errors.\n\n### Custom Message\n`@NotBlank(message = "custom message")` — pesan error custom.',
    explanationEn: '### Bean Validation\nValidate input with Jakarta annotations.\n\n### Annotations\n@NotNull, @NotBlank, @Size, @Min, @Max for different constraints.\n\n### @Valid\nTrigger validation on controller parameters.\n\n### Exception Handler\nHandle validation errors with MethodArgumentNotValidException.\n\n### Custom Messages\nProvide user-friendly error messages.',
    experimentsId: [
      'Buat custom validation annotation',
      'Eksperimen dengan validation groups',
      'Coba @Valid di nested object',
      'Buat custom validator class',
      'Eksperimen dengan i18n messages',
    ],
    experimentsEn: [
      'Create custom validation annotation',
      'Experiment with validation groups',
      'Try @Valid on nested objects',
      'Create custom validator class',
      'Experiment with i18n messages',
    ],
    challengeId: 'Buat form validation untuk User registration: name, email, password, age. Custom validation untuk password strength.',
    challengeEn: 'Build form validation for User registration: name, email, password, age. Custom validation for password strength.',
    summaryId: 'Minggu 8 dari 14: **Validation** (Level: Menengah). Input sanitization dan keamanan. Minggu depan: **Actuator & Monitoring**.',
    summaryEn: 'Week 8 of 14: **Validation** (Level: Intermediate). Input sanitization and security. Next week: **Actuator & Monitoring**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'actuator-monitoring',
    titleId: 'Actuator & Monitoring', titleEn: 'Actuator & Monitoring',
    programId: 'Health & Metrics', programEn: 'Health & Metrics',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'java',
    code: `// File: application.properties (Actuator config)
/*
management.endpoints.web.exposure.include=health,info,metrics,env
management.endpoint.health.show-details=always
management.info.env.enabled=true

info.app.name=My Spring Boot App
info.app.version=1.0.0
info.app.description=Demo Spring Boot Actuator
*/

// File: HealthCheck.java
/*
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Cek koneksi database, external service, dll
        boolean isHealthy = checkDatabaseConnection();

        if (isHealthy) {
            return Health.up()
                .withDetail("database", "Connected")
                .withDetail("timestamp", LocalDateTime.now())
                .build();
        } else {
            return Health.down()
                .withDetail("database", "Disconnected")
                .build();
        }
    }

    private boolean checkDatabaseConnection() {
        // Simulasi cek database
        return true;
    }
}
*/

// File: MetricsConfig.java
/*
@Component
public class OrderMetrics {

    private final MeterRegistry meterRegistry;

    public OrderMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    public void recordOrderCreated() {
        meterRegistry.counter("orders.created").increment();
    }

    public void recordOrderTotal(double amount) {
        meterRegistry.summary("orders.total").record(amount);
    }
}
*/

// Actuator Endpoints:
// GET /actuator/health — health check
// GET /actuator/info — app info
// GET /actuator/metrics — metrics
// GET /actuator/env — environment
// GET /actuator/beans — Spring beans
// GET /actuator/mappings — URL mappings

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
*/`,
    objectivesId: [
      'Spring Boot Actuator untuk monitoring dan management',
      'Health check endpoint dengan HealthIndicator',
      'Custom metrics dengan Micrometer',
      'Prometheus integration untuk metrics',
      'Info endpoint dan environment exposure',
    ],
    objectivesEn: [
      'Spring Boot Actuator for monitoring and management',
      'Health check endpoints with HealthIndicator',
      'Custom metrics with Micrometer',
      'Prometheus integration for metrics',
      'Info endpoint and environment exposure',
    ],
    explanationId: '### Actuator\nProduction-ready features: health, metrics, info, env.\n\n### Health Check\n`HealthIndicator` — custom health check. Return Health.up() atau Health.down().\n\n### Metrics\nMicrometer — metrics facade. Counter, Timer, Gauge, DistributionSummary.\n\n### Prometheus\n`micrometer-registry-prometheus` — export metrics ke Prometheus format.\n\n### Endpoints\n`/actuator/health`, `/actuator/metrics`, `/actuator/info`.',
    explanationEn: '### Actuator\nProduction-ready monitoring and management features.\n\n### Health Checks\nCustom health indicators for database, external services.\n\n### Metrics\nMicrometer for application metrics.\n\n### Prometheus\nExport metrics in Prometheus format.\n\n### Endpoints\nHealth, metrics, info endpoints for monitoring.',
    experimentsId: [
      'Buat custom health indicator',
      'Tambah custom metrics counter',
      'Eksperimen dengan Timer untuk measure duration',
      'Coba Prometheus scraping',
      'Buat custom actuator endpoint',
    ],
    experimentsEn: [
      'Create custom health indicator',
      'Add custom metrics counter',
      'Experiment with Timer for duration measurement',
      'Try Prometheus scraping',
      'Create custom actuator endpoint',
    ],
    challengeId: 'Buat monitoring dashboard: custom health check, metrics untuk order creation, Prometheus integration.',
    challengeEn: 'Build a monitoring dashboard: custom health check, metrics for order creation, Prometheus integration.',
    summaryId: 'Minggu 9 dari 14: **Actuator & Monitoring** (Level: Menengah). Observability di production. Minggu depan: **Messaging**.',
    summaryEn: 'Week 9 of 14: **Actuator & Monitoring** (Level: Intermediate). Production observability. Next week: **Messaging**.',
  },
  {
    week: 10, level: 'intermediate', topicId: 'messaging',
    titleId: 'Messaging', titleEn: 'Messaging',
    programId: 'Async & Events', programEn: 'Async & Events',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'java',
    code: `// File: OrderEvent.java
package com.example.demo.event;

public record OrderEvent(Long orderId, String status, String customerEmail) {}

// File: OrderEventPublisher.java
/*
@Component
public class OrderEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    public OrderEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void publishOrderCreated(OrderEvent event) {
        eventPublisher.publishEvent(event);
    }
}
*/

// File: OrderEventListener.java
/*
@Component
public class OrderEventListener {

    @EventListener
    @Async
    public void handleOrderCreated(OrderEvent event) {
        System.out.println("Order created: " + event.orderId());
        // Kirim email notifikasi
    }

    @EventListener
    public void handleOrderCancelled(OrderEvent event) {
        System.out.println("Order cancelled: " + event.orderId());
        // Refund payment
    }
}
*/

// File: AsyncConfig.java
/*
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}
*/

// File: AsyncService.java
/*
@Service
public class NotificationService {

    @Async
    public CompletableFuture<String> sendEmail(String to, String subject) {
        // Simulasi kirim email
        Thread.sleep(1000);
        return CompletableFuture.completedFuture("Email sent to " + to);
    }

    @Async
    public void sendSMS(String phone, String message) {
        // Simulasi kirim SMS
        System.out.println("SMS sent to " + phone);
    }
}
*/

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
*/`,
    objectivesId: [
      'Spring Events: ApplicationEventPublisher dan @EventListener',
      '@Async untuk asynchronous method execution',
      'CompletableFuture untuk async return value',
      'RabbitMQ integration dengan Spring AMQP',
      'Event-driven architecture pattern',
    ],
    objectivesEn: [
      'Spring Events: ApplicationEventPublisher and @EventListener',
      '@Async for asynchronous method execution',
      'CompletableFuture for async return values',
      'RabbitMQ integration with Spring AMQP',
      'Event-driven architecture pattern',
    ],
    explanationId: '### Spring Events\nEvent-driven communication antar component. `publishEvent()` dan `@EventListener`.\n\n### @Async\nMethod dijalankan di thread terpisah. Return void atau CompletableFuture.\n\n### CompletableFuture\nRepresentasi hasil async. `completedFuture()`, `supplyAsync()`.\n\n### RabbitMQ\nMessage broker untuk async communication. `@RabbitListener` untuk consume.\n\n### Event-Driven\nLoose coupling antar component. Event publisher tidak tahu siapa listener.',
    explanationEn: '### Spring Events\nEvent-driven communication between components.\n\n### @Async\nMethods run in separate threads.\n\n### CompletableFuture\nRepresent asynchronous results.\n\n### RabbitMQ\nMessage broker for async communication.\n\n### Event-Driven\nLoose coupling between publishers and listeners.',
    experimentsId: [
      'Buat custom event dan listener',
      'Eksperimen dengan @Async dan CompletableFuture',
      'Coba RabbitMQ dengan @RabbitListener',
      'Buat event-driven order processing',
      'Eksperimen dengan transactional events',
    ],
    experimentsEn: [
      'Create custom events and listeners',
      'Experiment with @Async and CompletableFuture',
      'Try RabbitMQ with @RabbitListener',
      'Create event-driven order processing',
      'Experiment with transactional events',
    ],
    challengeId: 'Buat sistem order dengan event-driven: OrderCreated event, email notification listener, SMS notification listener.',
    challengeEn: 'Build an order system with event-driven architecture: OrderCreated event, email notification listener, SMS notification listener.',
    summaryId: 'Minggu 10 dari 14: **Messaging** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Caching** (Advanced).',
    summaryEn: 'Week 10 of 14: **Messaging** (Level: Intermediate). Intermediate phase complete! Next week: **Caching** (Advanced).',
  },
  // ── ADVANCED (weeks 11-14) ────────────────────────────────────────────────
  {
    week: 11, level: 'advanced', topicId: 'caching',
    titleId: 'Caching', titleEn: 'Caching',
    programId: 'Redis Cache', programEn: 'Redis Cache',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'java',
    code: `// File: CacheConfig.java
package com.example.demo.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .disableCachingNullValues();

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withCacheConfiguration("products",
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(5)))
            .withCacheConfiguration("users",
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(30)))
            .build();
    }
}

// File: ProductService.java (dengan caching)
/*
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Cacheable(value = "products", key = "#id")
    public Optional<Product> getProductById(Long id) {
        System.out.println("Fetching from database...");
        return productRepository.findById(id);
    }

    @Cacheable(value = "products", key = "'all'")
    public List<Product> getAllProducts() {
        System.out.println("Fetching all from database...");
        return productRepository.findAll();
    }

    @CachePut(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "products", key = "#id")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @CacheEvict(value = "products", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared");
    }
}
*/

// Caching Annotations:
// @EnableCaching — aktifkan caching
// @Cacheable — cache result method
// @CachePut — update cache
// @CacheEvict — hapus cache
// @CacheConfig — shared config di class level`,
    objectivesId: [
      '@EnableCaching untuk aktifkan Spring caching',
      '@Cacheable untuk cache method result',
      '@CachePut dan @CacheEvict untuk update/hapus cache',
      'Redis sebagai cache store',
      'Cache configuration: TTL, key strategy',
    ],
    objectivesEn: [
      '@EnableCaching to enable Spring caching',
      '@Cacheable to cache method results',
      '@CachePut and @CacheEvict to update/remove cache',
      'Redis as cache store',
      'Cache configuration: TTL, key strategy',
    ],
    explanationId: '### Caching\nSimpan data yang sering di-access di memory (Redis) untuk mengurangi database load.\n\n### @Cacheable\nCache result method. Jika key sudah ada di cache, return cached value tanpa execute method.\n\n### @CachePut\nSelalu execute method dan update cache.\n\n### @CacheEvict\nHapus entry dari cache. `allEntries = true` untuk clear semua.\n\n### Redis\nIn-memory data store. Fast, support TTL, distributed cache.',
    explanationEn: '### Caching\nStore frequently accessed data in memory to reduce database load.\n\n### @Cacheable\nCache method results. Return cached value if key exists.\n\n### @CachePut\nAlways execute method and update cache.\n\n### @CacheEvict\nRemove entries from cache.\n\n### Redis\nIn-memory data store for fast, distributed caching.',
    experimentsId: [
      'Buat cache untuk method yang sering dipanggil',
      'Eksperimen dengan TTL berbeda per cache',
      'Coba conditional caching dengan #result',
      'Buat cache manager dengan multiple stores',
      'Eksperimen dengan cache statistics',
    ],
    experimentsEn: [
      'Create cache for frequently called methods',
      'Experiment with different TTLs per cache',
      'Try conditional caching with #result',
      'Create cache manager with multiple stores',
      'Experiment with cache statistics',
    ],
    challengeId: 'Buat caching layer untuk Product API: cache products, cache individual product, evict on update/delete.',
    challengeEn: 'Build a caching layer for Product API: cache products, cache individual product, evict on update/delete.',
    summaryId: 'Minggu 11 dari 14: **Caching** (Level: Lanjutan). Performa dan skalabilitas. Minggu depan: **Async & Scheduling**.',
    summaryEn: 'Week 11 of 14: **Caching** (Level: Advanced). Performance and scalability. Next week: **Async & Scheduling**.',
  },
  {
    week: 12, level: 'advanced', topicId: 'async-scheduling',
    titleId: 'Async & Scheduling', titleEn: 'Async & Scheduling',
    programId: 'Scheduled Tasks', programEn: 'Scheduled Tasks',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'java',
    code: `// File: ScheduledTasks.java
package com.example.demo.scheduler;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
@EnableScheduling
@EnableAsync
public class ScheduledTasks {

    // Fixed rate: setiap 5 detik
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        System.out.println("Waktu sekarang: " + java.time.LocalDateTime.now());
    }

    // Cron expression: setiap jam
    @Scheduled(cron = "0 0 * * * *")
    public void hourlyTask() {
        System.out.println("Task jam dieksekusi");
    }

    // Fixed delay: 3 detik setelah selesai
    @Scheduled(fixedDelay = 3000, initialDelay = 1000)
    public void cleanupTask() {
        System.out.println("Cleanup dijalankan");
    }

    // Async method
    @Async
    public CompletableFuture<String> processOrder(Long orderId) {
        // Simulasi proses async
        try { Thread.sleep(2000); } catch (InterruptedException e) {}
        return CompletableFuture.completedFuture("Order " + orderId + " processed");
    }

    @Async
    public void sendNotification(String message) {
        System.out.println("Notification: " + message);
    }
}

// File: AsyncService.java
/*
@Service
public class ReportService {

    @Async
    public CompletableFuture<Report> generateReport() {
        // Simulasi generate report yang lama
        Report report = new Report();
        // ... proses lama ...
        return CompletableFuture.completedFuture(report);
    }
}
*/

// Cron Expression Format:
// second minute hour day month weekday
// "0 0 * * * *" — setiap jam
// "0 0 0 * * *" — setiap hari tengah malam
// "0 */5 * * * *" — setiap 5 menit`,
    objectivesId: [
      '@Scheduled untuk task berjadwal',
      'Cron expression untuk scheduling',
      'fixedRate vs fixedDelay',
      '@Async untuk asynchronous execution',
      'CompletableFuture untuk async return',
    ],
    objectivesEn: [
      '@Scheduled for scheduled tasks',
      'Cron expressions for scheduling',
      'fixedRate vs fixedDelay',
      '@Async for asynchronous execution',
      'CompletableFuture for async returns',
    ],
    explanationId: '### @Scheduled\nTask berjadwal otomatis. Cron expression untuk fleksibilitas.\n\n### Cron Expression\n`second minute hour day month weekday`. `*` = setiap, `*/5` = setiap 5.\n\n### fixedRate vs fixedDelay\n- fixedRate: interval tetap dari start\n- fixedDelay: interval dari selesai\n\n### @Async\nMethod dijalankan di thread pool terpisah.\n\n### CompletableFuture\nReturn value dari async method.',
    explanationEn: '### @Scheduled\nAutomated scheduled tasks with cron expressions.\n\n### Cron Expressions\nFlexible scheduling with standard cron format.\n\n### fixedRate vs fixedDelay\nfixedRate: interval from start. fixedDelay: interval from completion.\n\n### @Async\nMethods run in separate thread pool.\n\n### CompletableFuture\nReturn values from async methods.',
    experimentsId: [
      'Buat scheduled task dengan cron expression',
      'Eksperimen dengan fixedRate vs fixedDelay',
      'Coba @Async dengan CompletableFuture',
      'Buat async method dengan exception handling',
      'Eksperimen dengan custom TaskScheduler',
    ],
    experimentsEn: [
      'Create scheduled task with cron expression',
      'Experiment with fixedRate vs fixedDelay',
      'Try @Async with CompletableFuture',
      'Create async method with exception handling',
      'Experiment with custom TaskScheduler',
    ],
    challengeId: 'Buat sistem reporting: scheduled task generate report setiap jam, async process, email notification.',
    challengeEn: 'Build a reporting system: scheduled task generates report every hour, async processing, email notification.',
    summaryId: 'Minggu 12 dari 14: **Async & Scheduling** (Level: Lanjutan). Background processing. Minggu depan: **Deployment**.',
    summaryEn: 'Week 12 of 14: **Async & Scheduling** (Level: Advanced). Background processing. Next week: **Deployment**.',
  },
  {
    week: 13, level: 'advanced', topicId: 'deployment',
    titleId: 'Deployment', titleEn: 'Deployment',
    programId: 'Docker & Cloud', programEn: 'Docker & Cloud',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'java',
    code: `// File: Dockerfile
/*
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
*/

// File: docker-compose.yml
/*
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
      - SPRING_REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
*/

// File: application-prod.properties
/*
spring.datasource.url=\${DATABASE_URL}
spring.datasource.username=\${DB_USER}
spring.datasource.password=\${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
server.port=8080
management.endpoints.web.exposure.include=health
*/

// Deployment Commands:
// mvn clean package -DskipTests
// docker build -t myapp .
// docker run -p 8080:8080 myapp
// docker-compose up -d`,
    objectivesId: [
      'Dockerfile untuk containerize Spring Boot app',
      'Multi-stage build untuk optimize image size',
      'Docker Compose untuk multi-container setup',
      'Environment variables untuk configuration',
      'Production profile dan health checks',
    ],
    objectivesEn: [
      'Dockerfile to containerize Spring Boot apps',
      'Multi-stage builds to optimize image size',
      'Docker Compose for multi-container setup',
      'Environment variables for configuration',
      'Production profiles and health checks',
    ],
    explanationId: '### Dockerfile\nDefine container image. Multi-stage: build di maven, run di JRE.\n\n### Multi-Stage Build\nStage 1: compile dengan Maven. Stage 2: run dengan JRE. Image lebih kecil.\n\n### Docker Compose\nOrchestrasi multiple container: app, database, redis.\n\n### Environment Variables\nConfig via env vars. Different values untuk dev/staging/prod.\n\n### Production\n`ddl-auto=validate` — tidak auto-create table. Health check untuk monitoring.',
    explanationEn: '### Dockerfile\nDefine container images with multi-stage builds.\n\n### Multi-Stage Build\nCompile in Maven stage, run in JRE stage for smaller images.\n\n### Docker Compose\nOrchestrate app, database, and cache containers.\n\n### Environment Variables\nExternalized configuration for different environments.\n\n### Production\nValidate schema, health checks for monitoring.',
    experimentsId: [
      'Buat Dockerfile dengan multi-stage build',
      'Eksperimen dengan Docker Compose',
      'Coba environment-specific profiles',
      'Buat health check endpoint',
      'Eksperimen dengan Kubernetes deployment',
    ],
    experimentsEn: [
      'Create Dockerfile with multi-stage build',
      'Experiment with Docker Compose',
      'Try environment-specific profiles',
      'Create health check endpoints',
      'Experiment with Kubernetes deployment',
    ],
    challengeId: 'Buat Docker setup untuk Spring Boot app: Dockerfile, docker-compose dengan database, environment config.',
    challengeEn: 'Build Docker setup for Spring Boot app: Dockerfile, docker-compose with database, environment config.',
    summaryId: 'Minggu 13 dari 14: **Deployment** (Level: Lanjutan). Production deployment. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 13 of 14: **Deployment** (Level: Advanced). Production deployment. Next week: **Capstone Project**!',
  },
  {
    week: 14, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: E-Commerce API', titleEn: 'Capstone: E-Commerce API',
    programId: 'Full Stack Backend', programEn: 'Full Stack Backend',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'java',
    code: `// Capstone: E-Commerce REST API
// Features: Auth, Products, Orders, Payment, Notifications

// File: Project Structure
/*
src/main/java/com/example/ecommerce/
├── ECommerceApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── CacheConfig.java
│   └── AsyncConfig.java
├── controller/
│   ├── AuthController.java
│   ├── ProductController.java
│   ├── OrderController.java
│   └── PaymentController.java
├── service/
│   ├── UserService.java
│   ├── ProductService.java
│   ├── OrderService.java
│   └── PaymentService.java
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── OrderRepository.java
├── model/
│   ├── User.java
│   ├── Product.java
│   ├── Order.java
│   └── Payment.java
├── dto/
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── ProductDTO.java
│   └── OrderDTO.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ProductNotFoundException.java
└── event/
    ├── OrderEvent.java
    └── OrderEventListener.java
*/

// File: OrderController.java (capstone example)
/*
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<OrderDTO> getUserOrders(Authentication auth) {
        return orderService.getOrdersByCustomer(auth.getName());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication auth) {
        OrderDTO order = orderService.createOrder(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public OrderDTO getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
*/

// Capstone Checklist:
// ✅ Spring Security + JWT
// ✅ CRUD REST API
// ✅ Validation
// ✅ Exception Handling
// ✅ Caching (Redis)
// ✅ Async + Events
// ✅ Testing (Unit + Integration)
// ✅ Docker + Docker Compose
// ✅ Actuator + Monitoring
// ✅ Production Config`,
    objectivesId: [
      'Menggabungkan semua konsep: Security, JPA, REST, Testing, Caching',
      'Layered architecture: Controller → Service → Repository',
      'Event-driven: OrderCreated → Email Notification',
      'Docker deployment dengan multi-container',
      'Production-ready: monitoring, health checks, caching',
    ],
    objectivesEn: [
      'Combine all concepts: Security, JPA, REST, Testing, Caching',
      'Layered architecture: Controller → Service → Repository',
      'Event-driven: OrderCreated → Email Notification',
      'Docker deployment with multi-container',
      'Production-ready: monitoring, health checks, caching',
    ],
    explanationId: '### Capstone\nAplikasi lengkap yang menggabungkan semua konsep yang dipelajari.\n\n### Architecture\nLayered architecture dengan separation of concerns.\n\n### Security\nJWT authentication, role-based access control.\n\n### Performance\nCaching dengan Redis, async processing.\n\n### Deployment\nDocker containerization, production config.',
    explanationEn: '### Capstone\nComplete application combining all learned concepts.\n\n### Architecture\nLayered architecture with separation of concerns.\n\n### Security\nJWT authentication with role-based access.\n\n### Performance\nRedis caching and async processing.\n\n### Deployment\nDocker containerization with production config.',
    experimentsId: [
      'Tambah fitur search dan filter products',
      'Implementasikan payment integration',
      'Buat admin dashboard endpoint',
      'Tambah unit test untuk semua layer',
      'Deploy ke cloud platform',
    ],
    experimentsEn: [
      'Add search and filter for products',
      'Implement payment integration',
      'Create admin dashboard endpoints',
      'Add unit tests for all layers',
      'Deploy to cloud platform',
    ],
    challengeId: 'Buat E-Commerce API lengkap: Auth, Products, Orders, Payment, Notifications. Docker + Testing + Monitoring.',
    challengeEn: 'Build a complete E-Commerce API: Auth, Products, Orders, Payment, Notifications. Docker + Testing + Monitoring.',
    summaryId: 'Minggu 14 dari 14: **Capstone: E-Commerce API** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Spring Boot dari nol hingga production-ready.',
    summaryEn: 'Week 14 of 14: **Capstone: E-Commerce API** (Level: Advanced). Complete! 🎉 You\'ve mastered Spring Boot from scratch to production-ready.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
