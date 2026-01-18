import { connectMongoDB, disconnectMongoDB } from "./client";
import { UserModel } from "@/api/user/userSchema";

async function seed() {
  await connectMongoDB();

  const existing = await UserModel.countDocuments();
  if (existing > 0) {
    console.log("ℹ️ Users already exist, skip seeding");
    return;
  }

  await UserModel.insertMany([
    {
      name: "Admin",
      email: "admin@example.com",
      age: 30,
    },
    {
      name: "Test User",
      email: "test@example.com",
      age: 25,
    },
  ]);

  console.log("✅ Seed users completed");
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed", err);
    process.exit(1);
  })
  .finally(disconnectMongoDB);
