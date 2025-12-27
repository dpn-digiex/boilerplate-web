import { makeAutoObservable } from "mobx";

export type ToastType = "success" | "error" | "warning" | null;

class ToastStore {
  message: string | null = null;
  type: ToastType = null;

  constructor() {
    makeAutoObservable(this);
  }

  showToast(message: string, type: "success" | "error" | "warning") {
    this.message = message;
    this.type = type;
  }

  hideToast() {
    this.message = null;
    this.type = null;
  }
}

const toastStore = new ToastStore();
export default toastStore;
