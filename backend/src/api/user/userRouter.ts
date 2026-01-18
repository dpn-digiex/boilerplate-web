import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserParamsSchema, UserResponseSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserResponseSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserResponseSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.string().describe("User ID (MongoDB ObjectId)"),
    }),
  },
  responses: createApiResponse(UserResponseSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserParamsSchema), userController.getUser);
