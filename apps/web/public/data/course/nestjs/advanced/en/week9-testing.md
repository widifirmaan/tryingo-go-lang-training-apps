# Testing NestJS

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 9:** Testing NestJS

## Learning Objectives

- Unit testing: Test.createTestingModule
- Mocking dependencies with useValue
- E2E testing: supertest + INestApplication
- Test coverage: jest --coverage
- Testing pipes, guards, and interceptors

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

## Key Concepts

### Unit Tests
Test.createTestingModule().

### Mocks
Replace dependencies with mocks.

### E2E
HTTP-level testing.

### Coverage
Measure test coverage.

---

## Experiments

- Create tests for all service methods
- Implement tests for guards and pipes
- Add database integration test with test DB
- Create factory for test data generation

---

## Challenge

Build comprehensive test suite: unit tests, e2e tests, 80%+ coverage.

---

## Summary

Week 9 of 12: **Testing NestJS** (Level: Advanced). Next week: **WebSockets & Real-time**.
