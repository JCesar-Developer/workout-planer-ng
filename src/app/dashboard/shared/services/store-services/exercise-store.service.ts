import { Injectable } from '@angular/core';

import { Exercise, Category } from '../../interfaces/exercise.interface';
import { ExerciseHttpService } from '../http-services/exercise-http.service';
import { BehaviorSubject, Observable, catchError, filter, map, of, take } from 'rxjs';
import { IdGenerator } from '@shared/plugins/uuid.plugin';

//TODO: Refactorizar todo esto
@Injectable({providedIn: 'root'})
export class ExerciseStoreService {

  private allExercises: Exercise[] = [];
  private currentCategory: Category = Category.ALL;
  private currentExercises$: BehaviorSubject<Exercise[]>;

  constructor(
    private exercisesHttpService: ExerciseHttpService,
  ) {
    this.store = this.allExercises;
    this.currentExercises$ = new BehaviorSubject<Exercise[]>(this.allExercises);
  }

  // GETTERS & SETTERS ---
  private set store( exercises: Exercise[] ) {
    if( exercises.length === 0 ) this.getAll();
  }

  public get exerciseCategories(): Category[] {
    return Object.values(Category);
  };

  public get currentExercises(): Observable<Exercise[]> {
    return this.currentExercises$.asObservable();
  }

  public setCurrentExercises(exercises: Exercise[]) {
    this.currentExercises$.next(exercises);
  }

  private getExercisesByName(name: string): Exercise[] {
    return this.allExercises.filter( e => e.name.toLowerCase().includes(name.toLowerCase()) );
  }

  private getExercisesByCategory(category: Category): Exercise[] {
    if( category === Category.ALL ) return this.allExercises;
    return this.allExercises.filter( e => e.category === category );
  }

  // SEARCH ---
  public getExercisesSuggestions(term: string): Exercise[] {
    let suggestions: Exercise[] = []

    if(!term) return suggestions;

    suggestions = this.getExercisesByName(term);
    return suggestions;
  }

  public filterExercisesByCategory(category: Category): void {
    if(this.currentCategory === category) return;

    if(category === Category.ALL) {
      this.currentCategory = Category.ALL;
      this.currentExercises$.next(this.allExercises);
      return;
    }

    const filteredExercises = this.getExercisesByCategory(category);
    this.currentCategory = category;
    this.currentExercises$.next(filteredExercises);
  };

  public getExerciseByIds(exerciseIds: string[]) {
    return this.currentExercises$.pipe(
      filter( currentExercises => currentExercises.length !== 0 ),
      map(() => this.allExercises.filter(e => exerciseIds.includes(e.id))),
      take(1),
    );
  };

  public getExercisesByNameAndCategory({ name, category }: {  name?: string, category?: Category }): void {

    if(!name && !category) {
      this.currentExercises$.next(this.allExercises);
      return;
    }

    if(name && category) {
      console.log( {name} );
      console.log( {category} )


      const filteredExercises = this.allExercises.filter(e =>
        e.name.toLowerCase().includes(name.toLowerCase()) && e.category === category
      );
      this.currentExercises$.next(filteredExercises);
      return;
    }

    if(name) {
      this.currentExercises$.next(this.getExercisesByName(name));
      return;
    }

    if(category) {
      this.currentExercises$.next(this.getExercisesByCategory(category));
      return;
    }
  };

  // CRUD -------------------------------------------------------------------------------------
  private getAll(): void {
    this.exercisesHttpService.getAll()
      .subscribe( exercises => {
        this.allExercises = exercises;
        this.currentExercises$.next(exercises)
        console.log('Exercises loaded');
      });
  }

  public save(exercise: Exercise): Observable<boolean> {
    exercise.id = IdGenerator.generateId();
    return this.exercisesHttpService.save(exercise).pipe(
      map(() => {
        this.allExercises.push(exercise);
        this.currentExercises$.next(this.allExercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public update(exercise: Exercise): Observable<boolean> {
    return this.exercisesHttpService.update(exercise).pipe(
      map(() => {
        const index = this.allExercises.findIndex( e => e.id === exercise.id );
        this.allExercises[index] = exercise;
        this.currentExercises$.next(this.allExercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public delete(exerciseId: string): Observable<boolean> {
    return this.exercisesHttpService.delete(exerciseId).pipe(
      map(() => {
        this.allExercises = this.allExercises.filter( e => e.id !== exerciseId );
        this.currentExercises$.next(this.allExercises);
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
