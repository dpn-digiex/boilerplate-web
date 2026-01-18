import { z } from "zod";

import "@/common/utils/zodExtension";
import { commonValidations } from "@/common/utils/commonValidation";

export const UserResponseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    age: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi("User");

export type UserResponse = z.infer<typeof UserResponseSchema>;

// Input Validation for 'GET users/:id' endpoint
export const GetUserParamsSchema = z.object({
  params: z.object({ id: commonValidations.id }).strict(), // MongoDB ObjectId validation
});
