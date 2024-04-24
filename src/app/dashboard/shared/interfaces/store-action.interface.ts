export interface StoreActions<T> {
  initializeStore(items: T[]): void;
  save(item: T): void;
  update(item: T): void;
  delete(itemId: string): void;
}
