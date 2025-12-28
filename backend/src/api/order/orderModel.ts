import { z } from "zod";
import "@/common/utils/zodExtension";

export type Order = z.infer<typeof OrderSchema>;
export const ProductSchema = z.object({
  name: z.string(),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().nonnegative(),
});

export const OrderSchema = z
  .object({
    items: z.array(ProductSchema).min(1),
  })
  .openapi("Order");

export const CreateOrderRequestSchema = z.object({
  body: z.object({ items: z.array(ProductSchema).min(1) }).strict(),
});
