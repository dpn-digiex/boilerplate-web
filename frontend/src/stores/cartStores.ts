import { autorun, makeAutoObservable } from "mobx";

import { Product } from "@interfaces/index";
import { inventory } from "@pages/home";

class CartStore {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    const previousItemsCart = localStorage.getItem("cart") as string;
    const parseItems = (JSON.parse(previousItemsCart) as Product[]) || [];
    if (parseItems.length > 0) {
      this.items = parseItems;
    }
    autorun(() => {
      localStorage.setItem("cart", JSON.stringify(this.items));
    });
  }

  setCart = (items: Product[]) => {
    this.items = items;
  };

  addToCart = (item: Product) => {
    const existingItem = this.items.find(i => i.name === item.name);
    if (existingItem) {
      const maximumQuantity = inventory.find(i => i.name === item.name)
        ?.quantity as number;
      const updatedQuantity = existingItem.quantity + 1;
      if (updatedQuantity <= maximumQuantity) {
        existingItem.quantity = updatedQuantity;
      } else {
        return "REACH_THE_LIMIT";
      }
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  };

  removeFromCart = (name: string) => {
    this.items = this.items.filter(i => i.name !== name);
  };

  updateQuantity = (name: string, updatedQuantity: number) => {
    const existingItem = this.items.find(i => i.name === name);
    if (!existingItem) return;
    const maximumQuantity = inventory.find(i => i.name === name)
      ?.quantity as number;
    if (updatedQuantity === 0) {
      this.removeFromCart(name);
    } else if (updatedQuantity > maximumQuantity) {
      return "REACH_THE_LIMIT";
    } else {
      existingItem.quantity = updatedQuantity;
    }
  };

  // compute
  get totalPrice() {
    return +this.items
      .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
      .toFixed(2);
  }
}

const cartStore = new CartStore();
export default cartStore;
