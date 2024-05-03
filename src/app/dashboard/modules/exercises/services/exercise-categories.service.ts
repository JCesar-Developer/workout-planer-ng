import { Category } from '@/dashboard/shared/models/exercise.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'any'})
export class ExerciseCategoriesService {

  private _categories: Category[] = Object.values(Category);
  private _currentCategory: BehaviorSubject<Category> = new BehaviorSubject<Category>(Category.ALL);

  public get categories(): Category[] {
    return this._categories;
  }

  public get currentCategory(): Observable<Category> {
    return this._currentCategory;
  }

  public setCurrentCategory( category: Category ) {
    this._currentCategory.next( category );
  }

  public setCurrentCategoryToAll() {
    this._currentCategory.next( Category.ALL );
  }

}
