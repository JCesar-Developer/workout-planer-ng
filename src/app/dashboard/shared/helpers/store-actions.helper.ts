import { StoreHandlerHelper } from "@/dashboard/store/handlers/store-handler.helper";
import { StoreActionsInterface } from "../interfaces/store-action.interface";
import { Observable } from "rxjs";

interface Item {
  id: string;
  name: string;
}

export class StoreActionsHelper<T extends Item> implements StoreActionsInterface<T> {
  constructor(
    private allItemsStoreHandler: StoreHandlerHelper<T>,
    private itemsToRenderStoreHandler: StoreHandlerHelper<T>,
  ) {}

  // GETTERS ---
  public get items$(): Observable<T[]> {
    return this.itemsToRenderStoreHandler.data$;
  }

  public get allItems(): T[] {
    return this.allItemsStoreHandler.data;
  }

  public getItemById(itemId: string): T {
    return this.allItems.find((item) => item.id === itemId)!;
  }

  public getItemsById(itemIds: string[]): T[] {
    return this.allItems.filter((item) => itemIds.includes(item.id));
  }

  public getItemsByName(term: string): T[] {
    return this.allItems.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
  }

  // SETTERS ---
  public setItemsToRender(items: T[]): void {
    this.itemsToRenderStoreHandler.setState(items);
  }
  public setItemsToRenderAllItems(): void {
    this.itemsToRenderStoreHandler.setState(this.allItems);
  }

  // CRUD ACTIONS ---
  public save(item: T): void {
    const newItemsArray = [...this.allItems, item];

    this.allItemsStoreHandler.setState(newItemsArray);
    this.itemsToRenderStoreHandler.setState(newItemsArray);
  }
  public update(item: T): void {
    const newItemsArray = [...this.allItems];
    const itemIndex = newItemsArray.findIndex((i) => i.id === item.id);

    newItemsArray[itemIndex] = item;

    this.allItemsStoreHandler.setState(newItemsArray);
    // this.itemsToRenderStoreHandler.setState(newItemsArray);
  }
  public delete(itemId: string): void {
    const newItemsArray = this.allItems.filter((item) => item.id !== itemId);

    this.allItemsStoreHandler.setState(newItemsArray);
    this.itemsToRenderStoreHandler.setState(newItemsArray);
  }

}
