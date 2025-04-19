import EventEmitter from 'events';

export const toastEmitter = new EventEmitter();

export const showToast = (message: string, options: { appearance: string }) => {
  toastEmitter.emit('show-toast', { message, options });
};
