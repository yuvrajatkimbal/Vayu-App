import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { toastEmitter } from "./ToastEmitter";

export const ToastListener: React.FC = () => {
  useEffect(() => {
    const handleToast = ({
      message,
      options
    }: {
      message: string;
      options?: any;
    }) => {
      toast(message, options); // Use react-hot-toast's toast function
    };

    toastEmitter.on("show-toast", handleToast);

    return () => {
      toastEmitter.off("show-toast", handleToast);
    };
  }, []);

  return null;
};
