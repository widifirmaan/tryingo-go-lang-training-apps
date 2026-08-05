# Testing with JUnit & Mockito

> Spring Boot | Modul 10

## Tujuan Pembelajaran

- Menulis unit test dengan JUnit 5
- Menggunakan Mockito untuk mocking
- Menggunakan @SpringBootTest untuk integration test
- Memahami test coverage

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

## Penjelasan

Spring Boot adalah framework Java yang menyederhanakan pengembangan aplikasi enterprise.
Spring Boot menggunakan konsep Dependency Injection dan auto-configuration.
Spring MVC menangani request HTTP dan mengembalikan response JSON.
Spring Data JPA menyederhanakan operasi database dengan repository pattern.

---

## Eksperimen

- Ubah endpoint dan jalankan aplikasi
- Tambah entity baru dengan relasi
- Coba tambah Spring Security untuk authentication

---

## Tantangan

Buat aplikasi Spring Boot REST API lengkap dengan CRUD, validation, dan authentication.
Jalankan dengan: ./mvnw spring-boot:run

---

## Ringkasan

Modul 10 dari 16: **Testing with JUnit & Mockito**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **11. Configuration & Profiles**.
