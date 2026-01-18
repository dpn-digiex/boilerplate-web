# Backend API Documentation

Express.js backend with TypeScript, providing RESTful API with security, validation, and OpenAPI documentation.

## 📋 Summary

**Features:**

- 🔒 **Security**: Helmet.js, CORS, Rate Limiting
- 📝 **Validation**: Zod schema validation with OpenAPI integration
- 📊 **Documentation**: Auto-generated Swagger/OpenAPI
- 🏗️ **Architecture**: Layered (Router → Controller → Service → Repository)
- 🗄️ **Database**: MongoDB with Mongoose ODM
- 🧪 **Testing**: Vitest framework
- 📦 **Type Safety**: Full TypeScript with strict mode
- 🚀 **Production Ready**: Docker support, error handling, logging

## 📁 Project Structure

```
backend/
├── src/
│   ├── api/                    # API modules (domain-based)
│   │   ├── healthCheck/        # Health check endpoint
│   │   └── user/               # User module
│   │       ├── __tests__/      # Unit tests
│   │       ├── userController.ts   # Request handlers
│   │       ├── userModel.ts        # Zod schemas & types
│   │       ├── userRepository.ts   # Data access layer
│   │       ├── userRouter.ts       # Route definitions
│   │       ├── userSchema.ts       # Mongoose schema
│   │       └── userService.ts      # Business logic
│   │
│   ├── api-docs/               # OpenAPI/Swagger documentation
│   ├── common/                 # Shared utilities
│   │   ├── db/                 # Database clients
│   │   │   └── mongo/         # MongoDB/Mongoose
│   │   │       ├── client.ts
│   │   │       ├── seed.ts
│   │   │       └── migrations/
│   │   ├── middleware/        # Express middlewares
│   │   ├── models/            # Shared data models
│   │   └── utils/             # Utility functions
│   │
│   └── index.ts               # Application entry point
│
├── dist/                      # Compiled JavaScript
├── .env.example               # Environment variables template
├── Dockerfile
├── package.json
└── tsconfig.json
```

## 🏗️ Architecture

### Layered Architecture

```
Router → Controller → Service → Repository → MongoDB
```

**Request Flow:**

1. Request → Express Router
2. Middleware → Rate limiting, CORS, Helmet, Logging
3. Router → Route handler with Zod validation
4. Controller → Process request, call service
5. Service → Business logic
6. Repository → Data access (Mongoose)
7. Response → ServiceResponse → HTTP response

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 22.11.0
- **Yarn**: Package manager
- **MongoDB**: Database server

### Installation

```bash
# Install dependencies
yarn install

# Seed database (optional)
yarn db:init
```

### Environment Configuration

Create `.env` file:

```env
NODE_ENV=development
HOST=localhost
PORT=5000
CORS_ORIGIN=http://localhost:3000
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=60000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/test-connection
```

### Development

```bash
# Run development server with hot reload
yarn dev

# Server runs at http://localhost:5000
```

### Production Build

```bash
# Build TypeScript to JavaScript
yarn build

# Start production server
yarn start
```

### Database Commands

```bash
# Seed database
yarn db:init

# Run migration
yarn db:migrate:001
```

**📖 See [src/common/db/README.md](./src/common/db/README.md) for detailed database guide.**

### Testing & Code Quality

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test -- --coverage

# Lint code
yarn lint

# Fix linting errors
yarn lint:fix
```

## 📡 API Endpoints

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: (configure via environment)

### Health Check

```
GET /health-check
```

### User Endpoints

```
GET /users              # Get all users
GET /users/{id}         # Get user by ID
```

### API Documentation

- **Swagger UI**: `http://localhost:5000/`
- **OpenAPI JSON**: `http://localhost:5000/swagger.json`

## 🔧 Configuration

### Environment Variables

| Variable                         | Description               | Default                                     | Required |
| -------------------------------- | ------------------------- | ------------------------------------------- | -------- |
| `NODE_ENV`                       | Environment               | `development`                               | No       |
| `HOST`                           | Server host               | `localhost`                                 | No       |
| `PORT`                           | Server port               | `3000`                                      | No       |
| `CORS_ORIGIN`                    | CORS allowed origin       | `http://localhost:3000`                     | No       |
| `COMMON_RATE_LIMIT_MAX_REQUESTS` | Max requests per window   | `1000`                                      | No       |
| `COMMON_RATE_LIMIT_WINDOW_MS`    | Rate limit window (ms)    | `60000`                                     | No       |
| `MONGODB_URI`                    | MongoDB connection string | `mongodb://localhost:27017/boilerplate-web` | No       |

### Path Aliases

```typescript
// Use @ alias instead of relative paths
import { userService } from "@/api/user/userService";
```

Configured in `tsconfig.json`: `@/*` → `src/*`

## 🛡️ Security Features

- **Helmet.js**: Security HTTP headers
- **CORS**: Cross-origin request configuration
- **Rate Limiting**: Request throttling per IP
- **Input Validation**: Zod schema validation

## 📝 Code Patterns

### Service Response Pattern

```typescript
// Success
const response = ServiceResponse.success("Data retrieved", data, StatusCodes.OK);

// Failure
const response = ServiceResponse.failure("Error message", null, StatusCodes.BAD_REQUEST);
```

### Request Validation

```typescript
const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);
```

### OpenAPI Documentation

```typescript
userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  responses: createApiResponse(UserSchema, "Success"),
});
```

## 🐳 Docker

```bash
# Build image
docker build -t backend-api .

# Run container
docker run -p 8081:8081 \
  -e NODE_ENV=production \
  -e PORT=8081 \
  -e MONGODB_URI=mongodb://host:27017/db \
  backend-api
```

## 📚 Tech Stack

- **Runtime**: Node.js 22.11.0
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.9.3
- **Database**: MongoDB with Mongoose 8.8.4
- **Validation**: Zod 4.1.12
- **API Docs**: @asteasolutions/zod-to-openapi 8.1.0
- **Security**: Helmet 8.1.0
- **Rate Limiting**: express-rate-limit 8.2.1
- **Logging**: Pino 10.1.0
- **Testing**: Vitest 4.0.6
- **Build**: TSUP 8.5.0

## 🎯 Quick Reference

```bash
# Development
yarn dev

# Build & Start
yarn build && yarn start

# Database
yarn db:init          # Seed database
yarn db:migrate:001   # Run migration

# Testing
yarn test
yarn test -- --coverage

# Code Quality
yarn lint
yarn lint:fix
```

## 📄 License

MIT

## 👤 Author

Phong Nguyen
