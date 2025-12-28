import type { Order } from "@/api/order/orderModel";

export const orders: Order[] = [
  {
    items: [{ name: "bacon", unitPrice: 10.99, quantity: 10 }],
  },
  {
    items: [{ name: "bacon", unitPrice: 10.99, quantity: 10 }],
  },
];

export class OrderRepository {
  async createOrder(order: Order): Promise<boolean> {
    const newOrder = { ...order };
    orders.push(newOrder);
    console.log("orders", orders);
    return true;
  }
}
