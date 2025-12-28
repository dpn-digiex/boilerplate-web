import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from "react-toastify";

import toastStore from "@stores/toastStore";

import "react-toastify/dist/ReactToastify.css";

const ToastNotifyWrapper: React.FC = observer(() => {
  const { message, type, hideToast } = toastStore;
  useEffect(() => {
    if (message && type) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else if (type === "warning") {
        toast.warning(message);
      }
      hideToast();
    }
  }, [message, type]);

  return (
    <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
  );
});

export default ToastNotifyWrapper;
