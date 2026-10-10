# Testing NestJS

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 9:** Testing NestJS

## Tujuan Pembelajaran

- Unit testing: Test.createTestingModule
- Mocking dependencies dengan useValue
- E2E testing: supertest + INestApplication
- Test coverage: jest --coverage
- Testing pipes, guards, dan interceptors

---

## Program: Unit & E2E Test

```javascript
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

console.log('NestJS Testing:');
console.log('');
console.log('=== Unit Test Setup ===');
console.log('describe("UsersService", () => {');
console.log('  let service: UsersService;');
console.log('  let repo: Repository<User>;');
console.log('');
console.log('  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo }
      ],
    }).compile();
    service = module.get(UsersService);
    repo = module.get(getRepositoryToken(User));
  });');
console.log('})');
console.log('');
console.log('=== Mock Repository ===');
const mockRepo = {
  find: () => Promise.resolve([{ id: 1, nama: 'Budi' }]),
  findOne: (id) => Promise.resolve({ id, nama: 'User ' + id }),
  create: (data) => ({ id: 3, ...data }),
  save: (data) => Promise.resolve(data),
  delete: () => Promise.resolve({ affected: 1 }),
};
console.log('const mockRepo = {');
console.log('  find: jest.fn().mockResolvedValue([...]),');
console.log('  findOne: jest.fn().mockResolvedValue({...}),');
console.log('  save: jest.fn().mockResolvedValue({...}),');
console.log('}');
console.log('');
console.log('=== E2E Test ===');
console.log('describe("Users (e2e)", () => {');
console.log('  let app: INestApplication;');
console.log('');
console.log('  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });');
console.log('');
console.log('  it("GET /users", () => {
    return request(app.getHttpServer())
      .get("/users")
      .expect(200)
      .expect([{ id: 1, nama: "Budi" }]);
  });');
console.log('})');
```

---

## Konsep Kunci

### Unit Test
Test.createTestingModule() untuk setup test module. Mock dependencies.

### Mock
{ provide: Token, useValue: mockObject } untuk replace real service.

### E2E
app.getHttpServer() + supertest untuk HTTP-level testing.

### Coverage
jest --coverage untuk lihat code coverage.

---

## Eksperimen

- Buat test untuk semua service methods
- Implementasikan test untuk guards dan pipes
- Tambah database integration test dengan test DB
- Buat factory untuk test data generation

---

## Tantangan

Buat comprehensive test suite: unit tests, e2e tests, 80%+ coverage.

---

## Ringkasan

Minggu 9 dari 12: **Testing NestJS** (Level: Lanjutan). Minggu depan: **WebSockets & Real-time**.
