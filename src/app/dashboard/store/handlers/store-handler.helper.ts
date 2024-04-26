import { Store } from "../dashboard.store";

export class StoreHandler<T> {

  constructor( private store: Store ) {
    console.log(this.store.state['workoutsToRender']);
  }

  public getItems( item: string ): any {
    console.log(this.store.state);
    // return [...this.store.state[item]];
  }
}
