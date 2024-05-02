import { Observable } from "rxjs";

export interface StoreActionsInterface<T> {
  get items$(): Observable<T[]>;
  get allItems(): T[];
  getItemById(itemId: string): T;
  getItemsById(itemIds: string[]): T[];
  getItemsByName(term: string): T[];
  setItemsToRender(items: T[]): void;
  setItemsToRenderAllItems(): void;
  save(item: T): void;
  update(item: T): void;
  delete(itemId: string): void;
}
