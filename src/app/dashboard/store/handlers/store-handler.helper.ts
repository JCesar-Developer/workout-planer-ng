import { Observable, map } from 'rxjs';
import { AppState, dashboardStore, AppStore } from '@/dashboard/store/dashboard.store';

export class StoreHandlerHelper<T> {

  private store: AppStore = dashboardStore;

  constructor(private dataKey: keyof AppState) {}

  public get data(): T[] {
    return [...this.store.state[this.dataKey] as T[]];
  }

  public get data$(): Observable<T[]> {
    return this.store.state$.pipe(
      map(state => state[this.dataKey] as T[])
    );
  }

  public setState(data: T[]): void {
    const currentState = this.store.state;
    this.store.setState({ ...currentState, [this.dataKey]: data });
  }

}
