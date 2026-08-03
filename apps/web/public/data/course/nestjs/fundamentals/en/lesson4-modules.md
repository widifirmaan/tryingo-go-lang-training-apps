# Modules: Architecture Organization

> NestJS | Nest Fundamentals | Lesson 4

## Learning Objectives

- Create a feature module per business domain
- Understand imports, exports, and provider sharing
- Use @Global for cross-module providers
- Read the architecture map from module files

---

## Program: Modules: Architecture Organization

```ts
import { Module } from '@nestjs/common';
import { KursusController } from './kursus.controller';
import { KursusService } from './kursus.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule], // provider SharedModule yang di-export tersedia di sini
  controllers: [KursusController],
  providers: [KursusService],
  exports: [KursusService], // SertifikatModule boleh memakai KursusService
})
export class KursusModule {}
```

---

## Explanation

## Modules = Business Domain Boundaries
A module groups everything ONE feature needs: controller + service + DTO + entity. One module per domain (courses, certificates, users, orders). Small modules = a readable architecture map: open app.module.ts and you know ALL of the app's features. This is Nest's main difference from Express: the architecture is visible in the folder structure, not hidden in a router file.
## imports & exports: The Sharing Roads
Providers are private per module UNLESS exported. KursusModule exports KursusService → SertifikatModule imports KursusModule → SertifikatService can inject KursusService. Restrained exports are healthy design: only what others truly need. If SertifikatModule needs KursusService, do not re-register it - follow the export path.
## @Global: Providers "in the Air"
@Global() makes a provider available in all modules WITHOUT import. Good for: logging, config, DB connections, audit. Use sparingly - global = hidden dependency. Bootcamp rule of thumb: global for infrastructure, modules for business.
## Circular Dependencies & Dynamic Modules
Two modules importing each other = circular dependency → a Nest error. Solution: forwardRef(() => OtherModule) - but that is a design alarm: move the shared provider into a third module. Dynamic modules (forRoot) let a module accept configuration - used by @nestjs/config and TypeOrmModule (lesson 7).

---

## Experiments

1. **Modules = Business Domain Boundaries**
2. **imports & exports: The Sharing Roads**
3. **@Global: Providers "in the Air"**
4. **Circular Dependencies & Dynamic Modules**

---

## Challenge

Refactor to domain architecture: (1) create a UserModule (user.controller + user.service) storing a user list, (2) KursusModule injects UserService through the exports path (add GET /kursus/:id/peserta), (3) move AuditService into a @Global InfraModule, (4) draw your modules' dependency graph on paper and match it against the code.

---

## Summary

Modules = domain boundaries. exports = the sharing roads. @Global for infrastructure. Circular = a design alarm. Read the architecture from app.module. Next: pipes & DTO validation.
