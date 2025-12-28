import express, { type Router } from "express";
import { validateRequest } from "@/common/utils/httpHandlers";
import { orderController } from "@/api/order/orderController";
import { CreateOrderRequestSchema } from "./orderModel";

export const orderRouter: Router = express.Router();

orderRouter.post("/create", validateRequest(CreateOrderRequestSchema), orderController.createOrder);
