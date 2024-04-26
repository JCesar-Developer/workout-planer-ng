import { Component, Input } from '@angular/core';
import { StoreActions } from '@/dashboard/shared/interfaces/store-action.interface';

@Component({
  selector: 'shared-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent<T> {
  @Input() storeActions!: StoreActions<T>;
  @Input() field: string = 'name';
  public suggestedItems: T[] = [];

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
