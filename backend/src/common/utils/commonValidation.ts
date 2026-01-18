import { z } from "zod";

export const commonValidations = {
  // MongoDB ObjectId validation (24 hex characters)
  id: z
    .string()
    .min(1, "ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid MongoDB ObjectId"),
  // ... other common validations
};
