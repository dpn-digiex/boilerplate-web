import type { Request, RequestHandler, Response } from "express";

import { orderService } from "@/api/order/orderService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class OrderController {
  public createOrder: RequestHandler = async (_req: Request, res: Response) => {
    const requestData = _req.body;
    const serviceResponse = await orderService.createOrder(requestData);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const orderController = new OrderController();
