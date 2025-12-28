import { Product } from "@interfaces/index";

import { axiosPublic } from "./clientAxios";

export const createOrder = async (items: Product[]) => {
  try {
    const res = await axiosPublic.post("/order/create", { items });
    console.log("response", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
