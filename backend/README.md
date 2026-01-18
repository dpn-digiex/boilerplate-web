# Backend API Documentation

## 🌿 Git Branches

This repository has two main branches for different database implementations:

- **`master-mongodb`**: For using MongoDB as the database
- **`master-postgres`**: For using PostgreSQL with Prisma ORM

**Note**: Make sure to checkout the appropriate branch based on your database choice before starting development.

## 📋 Summary

Backend API built with **Express.js** and **TypeScript**, providing RESTful API with the following features:

- 🔒 **Security**: Helmet.js, CORS, Rate Limiting
- 📝 **Validation**: Zod schema validation with OpenAPI integration
- 📊 **Documentation**: Auto-generated Swagger/OpenAPI
- 🏗️ **Architecture**: Layered architecture (Controller → Service → Repository)
- 🧪 **Testing**: Vitest test framework
- 📦 **Type Safety**: Full TypeScript with strict mode
- 🚀 **Production Ready**: Docker support, error handling, logging

## 📁 Project Layout

```
backend/
├── src/
│   ├── api/                    # API modules (domain-based)
│   │   ├── healthCheck/        # Health check endpoint
│   │   │   ├── __tests__/      # Unit tests
│   │   │   └── healthCheckRouter.ts
│   │   └── user/               # User module
│   │       ├── __tests__/      # Unit tests
│   │       ├── userController.ts   # Request handlers
│   │       ├── userModel.ts        # Zod schemas & types
│   │       ├── userRepository.ts  # Data access layer
│   │       ├── userRouter.ts      # Route definitions
│   │       └── userService.ts     # Business logic
│   │
│   ├── api-docs/               # OpenAPI/Swagger documentation
│   │   ├── __tests__/
│   │   ├── openAPIDocumentGenerator.ts
│   │   ├── openAPIResponseBuilders.ts
│   │   └── openAPIRouter.ts
│   │
│   ├── common/                 # Shared utilities
│   │   ├── __tests__/
│   │   ├── middleware/         # Express middlewares
│   │   │   ├── errorHandler.ts    # Global error handler
│   │   │   ├── rateLimiter.ts     # Rate limiting
│   │   │   └── requestLogger.ts   # Request logging (Pino)
│   │   ├── models/              # Shared data models
│   │   │   └── serviceResponse.ts  # Standard API response
│   │   └── utils/               # Utility functions
│   │       ├── commonValidation.ts  # Common Zod validations
│   │       ├── envConfig.ts         # Environment config (Envalid)
│   │       ├── httpHandlers.ts      # HTTP response helpers
│   │       └── zodExtension.ts      # Zod OpenAPI extension
│   │
│   └── index.ts                # Application entry point & server setup (includes Express app config, middleware, routes, and server startup)
│
├── dist/                       # Compiled JavaScript (generated)
├── node_modules/               # Dependencies
├── .env.example                # Environment variables template
├── .gitignore
├── Dockerfile                  # Docker configuration
├── eslint.config.mjs           # ESLint configuration
├── package.json
├── prettierrc                  # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.mts            # Build configuration (TSUP)
└── yarn.lock
```

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Router Layer                │
│  (Request validation, OpenAPI docs) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Controller Layer             │
│    (HTTP request/response handling) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Service Layer               │
│      (Business logic)               │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Repository Layer             │
│    (Data access, database queries)  │
└─────────────────────────────────────┘
```

### Request Flow

1. **Request** → Express Router
2. **Middleware** → Rate limiting, CORS, Helmet, Logging
3. **Router** → Route handler with Zod validation
4. **Controller** → Process request, call service
5. **Service** → Business logic
6. **Repository** → Data access
7. **Response** → ServiceResponse → HTTP response

### Entry Point (`index.ts`)

The `index.ts` file is the single entry point of the application, including:

1. **Zod Extension**: Import and extend Zod with OpenAPI support
2. **Express App Setup**: Create Express app instance
3. **Middleware Configuration**: CORS, Helmet, Rate Limiting, Request Logging
4. **Route Registration**: Register all routes
5. **Error Handler**: Global error handling middleware
6. **Server Startup**: Start HTTP server
7. **Graceful Shutdown**: Handle SIGINT/SIGTERM signals

**Exports**: `app` and `logger` are exported for use in tests and other modules.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 22.11.0
- **Yarn**: Package manager
- **TypeScript**: ^5.9.3

### Installation

```bash
# Install dependencies
yarn install
```

### Environment Configuration

Configure environment variables:

```env
NODE_ENV=development
HOST=localhost
PORT=5000
CORS_ORIGIN=http://localhost:3000
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=1000
```

### Development

```bash
# Run development server with hot reload
yarn dev

# Server will run at http://localhost:5000
```

### Production Build

```bash
# Build TypeScript to JavaScript
yarn build

# Start production server
yarn start
```

### Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test -- --coverage
```

### Code Quality

```bash
# Lint code
yarn lint

# Fix linting errors
yarn lint:fix

# Format code (Prettier)
yarn format
```

## 📡 API Endpoints

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: (configure via environment)

### Health Check

```
GET /health-check
```

Check server status.

**Response:**

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": null,
  "statusCode": 200
}
```

### User Endpoints

#### Get All Users

```
GET /users
```

**Response:**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "statusCode": 200
}
```

#### Get User by ID

```
GET /users/{id}
```

**Parameters:**

- `id` (string, required): User ID

**Response:**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200
}
```

### API Documentation

Swagger UI available at:

- **Swagger UI**: `http://localhost:5000/`
- **OpenAPI JSON**: `http://localhost:5000/swagger.json`

## 🔧 Configuration

### Environment Variables

| Variable                         | Description                               | Default                 | Required |
| -------------------------------- | ----------------------------------------- | ----------------------- | -------- |
| `NODE_ENV`                       | Environment (development/production/test) | `development`           | No       |
| `HOST`                           | Server host                               | `localhost`             | No       |
| `PORT`                           | Server port                               | `3000`                  | No       |
| `CORS_ORIGIN`                    | CORS allowed origin                       | `http://localhost:3000` | No       |
| `COMMON_RATE_LIMIT_MAX_REQUESTS` | Max requests per window                   | `1000`                  | No       |
| `COMMON_RATE_LIMIT_WINDOW_MS`    | Rate limit window (ms)                    | `1000`                  | No       |

### Path Aliases

The project uses path aliases for easier imports:

```typescript
// Instead of
import { userService } from "../../../api/user/userService";

// Use
import { userService } from "@/api/user/userService";
```

Path alias is configured in `tsconfig.json`:

- `@/*` → `src/*`

## 🛡️ Security Features

### 1. Helmet.js

- Set security HTTP headers
- Prevent XSS, clickjacking, etc.

### 2. CORS

- Configure cross-origin requests
- Only allow specified origin

### 3. Rate Limiting

- Limit number of requests from an IP
- Use `ipKeyGenerator` for IPv6 support
- Configuration: `COMMON_RATE_LIMIT_MAX_REQUESTS` requests within `COMMON_RATE_LIMIT_WINDOW_MS` ms

### 4. Input Validation

- All inputs are validated with Zod schemas
- Automatic validation error handling

## 📝 Code Patterns

### Service Response Pattern

All API responses use the `ServiceResponse` class:

```typescript
// Success response
const response = ServiceResponse.success("Data retrieved", data, StatusCodes.OK);

// Failure response
const response = ServiceResponse.failure("Error message", null, StatusCodes.BAD_REQUEST);
```

### Request Validation

Use Zod schemas with `validateRequest` middleware:

```typescript
// Define schema
const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Use in router
userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);
```

### OpenAPI Documentation

Auto-generate OpenAPI docs from Zod schemas:

```typescript
userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.string().describe("User ID"),
    }),
  },
  responses: createApiResponse(UserSchema, "Success"),
});
```

## 🐳 Docker

### Build Image

```bash
docker build -t backend-api .
```

### Run Container

```bash
docker run -p 8081:8081 \
  -e NODE_ENV=production \
  -e PORT=8081 \
  -e CORS_ORIGIN=http://localhost:3000 \
  backend-api
```

### Dockerfile

- Base image: `node:22.11.0-slim`
- Build command: `npm run build`
- Exposed port: `8081`
- Start command: `npm run start`

## 📚 Tech Stack

- **Runtime**: Node.js 22.11.0
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.9.3
- **Validation**: Zod 4.1.12
- **API Docs**: @asteasolutions/zod-to-openapi 8.1.0
- **Security**: Helmet 8.1.0
- **Rate Limiting**: express-rate-limit 8.2.1
- **Logging**: Pino 10.1.0
- **Testing**: Vitest 4.0.6
- **Build**: TSUP 8.5.0

## 📄 License

MIT

## 👤 Author

Phong Nguyen
