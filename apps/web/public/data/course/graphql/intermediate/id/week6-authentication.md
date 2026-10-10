# Authentication & Authorization

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 6:** Authentication & Authorization

## Tujuan Pembelajaran

- JWT token generation
- Context authentication
- Role-based authorization
- Custom directive @auth
- Error handling

---

## Program: Keamanan GraphQL

```javascript
// JWT Authentication & Authorization
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate token
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify token dari header
function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return { id: decoded.userId, role: decoded.role };
  } catch {
    return null;
  }
}

// Context dengan auth
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const currentUser = getUser(token);
    return { currentUser, db };
  },
});

// Directive untuk authorization
const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const requiredRole = this.args.requires;
    
    field.resolve = async function (...args) {
      const context = args[2];
      if (!context.currentUser) {
        throw new Error('Not authenticated');
      }
      if (requiredRole && context.currentUser.role !== requiredRole) {
        throw new Error('Not authorized');
      }
      return resolve.apply(this, args);
    };
  }
}

// Schema dengan directive
// type Query {
//   users: [User!]! @auth(requires: ADMIN)
//   me: User @auth
// }
```

---

## Konsep Kunci

### JWT
JSON Web Token untuk authentication.

### Context
Verifikasi token di context, inject user.

### Authorization
Cek role di resolver atau directive.

### Directive
Custom directive untuk protect fields.

### Error
Throw AuthenticationError vs ForbiddenError.

---

## Eksperimen

- Refresh tokens
- Rate limiting
- API key auth
- OAuth integration

---

## Tantangan

Auth system: register, login, JWT, role-based access.

---

## Ringkasan

Minggu 6 dari 10: **Authentication & Authorization** (Menengah).
