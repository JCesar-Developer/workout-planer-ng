export interface StoreActionsInterface<T> {
  initializeStore(items: T[]): void;
  getItemsByName(term: string): T[];
  setItemsToRender(items: T[]): void;
  setItemsToRenderAllItems(): void;
  save(item: T): void;
  update(item: T): void;
  delete(itemId: string): void;
}
