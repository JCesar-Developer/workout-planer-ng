import { Component } from '@angular/core';
import { StoreActions } from '@/dashboard/shared/interfaces/store-action.interface';

@Component({
  selector: 'shared-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent<T> {
  public suggestedItems!: T[];
  private storeActions!: StoreActions<T>;

  // constructor(
  //   storeActions: StoreActions
  // ) {
  //   this.storeActions = storeActions;
  // }

  public onRequireSuggestions({ query } : { query: string }): void {
    if( !query ) {
      this.suggestedItems = [];
      this.storeActions.setItemsToRenderAllItems();
      return;
    }

    this.suggestedItems = this.getSuggestions(query);

    if( this.suggestedItems.length === 0 ) this.storeActions.setItemsToRender([]);
    else this.storeActions.setItemsToRender( this.suggestedItems );
  }

  public onSelectSuggestion({ name } : { name: string }): void {
    this.suggestedItems = this.getSuggestions(name);
    this.storeActions.setItemsToRender( this.suggestedItems );
  }

  private getSuggestions(term: string): T[] {
    let suggestions: T[] = []

    if(!term) return suggestions;

    return this.storeActions.getItemsByName(term);
  }

}
