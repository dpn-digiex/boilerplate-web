import { makeAutoObservable } from "mobx";

import { Product } from "@interfaces/index";
import { inventory } from "@pages/home";

export type ToastType = "success" | "error" | "warning" | null;

class CartStore {
  items: Product[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  addToCart = (item: Product) => {
    const existingItem = this.items.find((i: Product) => i.name === item.name);
    if (existingItem) {
      const maximumQuantity = inventory.find(
        (i: Product) => i.name === item.name
      )?.quantity as number;
      const updatedQuantity = existingItem.quantity + 1;
      if (updatedQuantity <= maximumQuantity) {
        existingItem.quantity = updatedQuantity;
      }
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  };

  removeFromCart = (itemName: string) => {
    this.items = this.items.filter(i => i.name !== itemName);
  };

  updateQuantity = (itemName: string, updatedQuantity: number) => {
    const existingItem = this.items.find((i: Product) => i.name === itemName);
    if (!existingItem) return;
    if (updatedQuantity === 0) return this.removeFromCart(itemName);
    const maximumQuantity = inventory.find((i: Product) => i.name === itemName)
      ?.quantity as number;
    if (updatedQuantity <= maximumQuantity) {
      existingItem.quantity = updatedQuantity;
    }
  };
}

const cartStore = new CartStore();
export default cartStore;
