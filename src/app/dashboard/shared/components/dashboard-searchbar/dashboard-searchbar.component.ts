import { Component, Input } from '@angular/core';

export interface StoreActions<T> {
  getItemsByName: (term: string) => T[];
  setItemsToRender: (items: T[]) => void;
  setItemsToRenderAllItems: () => void;
}

@Component({
  selector: 'dashboard-searchbar',
  templateUrl: './dashboard-searchbar.component.html',
})
export class SearchbarComponent<T> {
  @Input() storeActions!: {
    getItemsByName: (term: string) => T[];
    setItemsToRender: (items: T[]) => void;
    setItemsToRenderAllItems: () => void;
  };
  @Input() showSuggestions: boolean = true;
  @Input() field: string = 'name';
  public suggestedItems: T[] = [];

  private getSuggestions(term: string): T[] {
    let suggestions: T[] = []

    if(!term) return suggestions;

    return this.storeActions.getItemsByName(term);
  }

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

}
