import { connectMongoDB, disconnectMongoDB } from "../client";
import { UserModel } from "@/api/user/userSchema";

// rename the name field to fullname
async function migrate() {
  await connectMongoDB();
  const result = await UserModel.updateMany({ name: { $exists: true } }, { $rename: { name: "fullname" } });
  console.log(`✅ Renamed name → fullname (${result.modifiedCount})`);
}

migrate().catch(console.error).finally(disconnectMongoDB);
