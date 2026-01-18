# Database Guide

Quick reference for working with MongoDB in this project.

## 🧠 Concept & Mindset

### Connection Management

- **Single connection instance**: MongoDB connection is managed centrally in `mongo/client.ts`
- **Auto-connect on startup**: Connection is tested automatically when server starts
- **Graceful shutdown**: Connection is closed properly on server shutdown
- **Never create new connections**: Always use the exported functions from `client.ts`

## 📁 Structure

```
db/
├── mongo/
│   ├── client.ts          # Connection management
│   ├── seed.ts            # Initial data seeding
│   └── migrations/        # Data migration scripts
│       └── 001_*.ts
```

## 🔧 Usage

### Connection Functions

```typescript
import { connectMongoDB, disconnectMongoDB, testConnection } from "@/common/db/mongo/client";

// Connect (usually called automatically on server start)
await connectMongoDB();

// Test connection
await testConnection();

// Disconnect (usually called automatically on shutdown)
await disconnectMongoDB();
```

**Note**: Connection is handled automatically in `index.ts`. You typically don't need to call these manually.

````
## 🌱 Seeding

### Run Seed

```bash
yarn db:init
````

## 🔄 Migrations

### Run Migration

```bash
yarn db:migrate:001
```

### Migration File Structure

```typescript
// src/common/db/mongo/migrations/001_description.ts
import { connectMongoDB, disconnectMongoDB } from "../client";
import { UserModel } from "@/api/user/userSchema";

async function migrate() {
  await connectMongoDB();

  // Migration logic
  const result = await UserModel.updateMany({ condition }, { $set: { field: value } });

  console.log(`✅ Migration completed (${result.modifiedCount} documents)`);
}

migrate().catch(console.error).finally(disconnectMongoDB);
```

### Migration Naming

- Format: `{number}_{description}.ts`
- Example: `001_rename_name.ts`, `002_add_phone_field.ts`
- Always increment number for new migrations

## 🎯 Quick Reference

```bash
# Seed database
yarn db:init

# Run migration
yarn db:migrate:001

# Connection is automatic
# - Connects on server start
# - Disconnects on server shutdown
```

## 📝 Notes

- **Never create multiple connections**: Use the centralized client
- **Migrations are manual**: Run them explicitly when needed
- **Seeds are idempotent**: Safe to run multiple times
- **Always use TypeScript types**: Leverage `UserLean` for lean queries
