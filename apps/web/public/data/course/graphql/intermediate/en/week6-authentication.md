# Authentication & Authorization

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 6:** Authentication & Authorization

## Learning Objectives

- JWT token generation
- Context authentication
- Role-based authorization
- Custom @auth directive
- Error handling

---

## Program: GraphQL Security

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

## Key Concepts

### JWT
JSON Web Tokens for authentication.

### Context
Verify token in context, inject user.

### Authorization
Check roles in resolvers or directives.

### Directives
Custom directives to protect fields.

### Errors
Throw AuthenticationError vs ForbiddenError.

---

## Experiments

- Refresh tokens
- Rate limiting
- API key auth
- OAuth integration

---

## Challenge

Auth system: register, login, JWT, role-based access.

---

## Summary

Week 6 of 10: **Authentication & Authorization** (Intermediate).
