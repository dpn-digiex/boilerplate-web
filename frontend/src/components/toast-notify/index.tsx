import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from "react-toastify";

import toastStore from "@stores/toastStore";

import "react-toastify/dist/ReactToastify.css";

const ToastNotifyWrapper: React.FC = observer(() => {
  useEffect(() => {
    if (toastStore.message && toastStore.type) {
      if (toastStore.type === "success") {
        toast.success(toastStore.message);
      } else if (toastStore.type === "error") {
        toast.error(toastStore.message);
      } else if (toastStore.type === "warning") {
        toast.warning(toastStore.message);
      }
      toastStore.hideToast();
    }
  }, [toastStore.message, toastStore.type]);

  return (
    <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
  );
});

export default ToastNotifyWrapper;
