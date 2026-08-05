# Testing with JUnit & Mockito

> Spring Boot | Module 10

## Learning Objectives

- Write unit tests with JUnit 5
- Use Mockito for mocking
- Use @SpringBootTest for integration test
- Understand test coverage

---

## Program: Test Suite

```java
@SpringBootTest
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    @Test
    void shouldReturnAllPosts() {
        when(postRepository.findAll())
            .thenReturn(List.of(new Post(1L, "Title")));

        List<Post> posts = postService.getAllPosts();

        assertEquals(1, posts.size());
        verify(postRepository).findAll();
    }
}
```

---

## Explanation

Spring Boot is a Java framework that simplifies enterprise application development.
Spring Boot uses Dependency Injection and auto-configuration concepts.
Spring MVC handles HTTP requests and returns JSON responses.
Spring Data JPA simplifies database operations with the repository pattern.

---

## Experiments

- Change the endpoint and run the application
- Add a new entity with relationships
- Try adding Spring Security for authentication

---

## Challenge

Build a complete Spring Boot REST API with CRUD, validation, and authentication.
Run with: ./mvnw spring-boot:run

---

## Summary

Module 10 of 16: **Testing with JUnit & Mockito**. Spring Boot is a Java framework for building enterprise applications. Next week: **Configuration & Profiles**.
