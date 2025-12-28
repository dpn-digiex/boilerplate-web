import { StatusCodes } from "http-status-codes";

import { OrderRepository } from "@/api/order/orderRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/index";
import { Order } from "./orderModel";

export class OrderService {
  private orderRepository: OrderRepository;
  constructor(repository: OrderRepository = new OrderRepository()) {
    this.orderRepository = repository;
  }

  async createOrder(order: Order): Promise<ServiceResponse<boolean>> {
    try {
      await this.orderRepository.createOrder(order);
      return ServiceResponse.success<true>("Create order successful", true, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred.", true, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const orderService = new OrderService();
