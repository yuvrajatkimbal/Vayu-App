import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastEmitter } from './ToastEmitter';

export const ToastListener: React.FC = () => {
  const { addToast } = useToasts();

  useEffect(() => {
    const handleToast = ({ message, options }: { message: string; options: any }) => {
      addToast(message, options);
    };

    toastEmitter.on('show-toast', handleToast);

    return () => {
      toastEmitter.off('show-toast', handleToast);
    };
  }, [addToast]);

  return null;
}  