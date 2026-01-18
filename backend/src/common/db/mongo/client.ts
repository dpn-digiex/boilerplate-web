import mongoose from "mongoose";

import { env } from "@/common/utils/envConfig";
import { logger } from "@/common/utils/logger";

let isConnected = false;

export const connectMongoDB = async (): Promise<void> => {
  if (isConnected) {
    logger.info("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    isConnected = true;
    logger.info("✅ Connected to MongoDB successfully at URI: " + env.MONGODB_URI);
  } catch (error) {
    isConnected = false;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error({ err: error }, "❌ MongoDB connection error");
    throw new Error(`MongoDB connection failed: ${errorMessage}`);
  }
};

export const disconnectMongoDB = async (): Promise<void> => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    logger.info("MongoDB disconnected");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error({ err: error }, "Error disconnecting MongoDB");
    throw new Error(`MongoDB disconnection failed: ${errorMessage}`);
  }
};

export const testConnection = async (): Promise<void> => {
  try {
    await connectMongoDB();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error({ err: error }, "MongoDB connection test failed");
    throw new Error(`MongoDB connection test failed: ${errorMessage}`);
  }
};
