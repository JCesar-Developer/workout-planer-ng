export interface ToastMessage {
  success: {
    create: (itemName: string) => string;
    update: (itemName: string) => string;
    delete: (itemName: string) => string;
  };
  error: {
    create: string;
    update: string;
    delete: string;
  };
}
