import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseSearchbarComponent } from './exercise-searchbar.component';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ExerciseSearchbarComponent', () => {
  let component: ExerciseSearchbarComponent;
  let fixture: ComponentFixture<ExerciseSearchbarComponent>;
  let exerciseStoreService: ExerciseStoreService;

  const exercise1 = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };
  const exercise2 = { id: '2', name: 'Exercise 2', category: Category.LEGS, image: './assets/images/exercises/exercise-2.gif' };
  const exercise3 = { id: '3', name: 'Exercise 3', category: Category.CORE, image: './assets/images/exercises/exercise-3.gif' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseSearchbarComponent ],
      imports: [ HttpClientTestingModule, AutoCompleteModule ],
      providers: [ ExerciseStoreService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSearchbarComponent);
    component = fixture.componentInstance;
    exerciseStoreService = TestBed.inject(ExerciseStoreService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //Use-case: Searching exercises ---
  it('filterExercise method should interact with the getExercisesSuggestions method from the service', () => {
    const getSuggestionsSpy = spyOn(exerciseStoreService, 'getExercisesSuggestions');

    const query = 'Test';
    component.filterExercise({ query });

    expect(getSuggestionsSpy).toHaveBeenCalledWith(query);

    getSuggestionsSpy.calls.reset();
  });

  it('autocomplete input should trigger the completeMethod method when input is changed', () => {
    const spyFilterMethod = spyOn(component, 'filterExercise');

    const inputElement: DebugElement = fixture.debugElement.query(By.css('p-autocomplete'));
    inputElement.triggerEventHandler('completeMethod', { query: 'test' });

    fixture.detectChanges();

    expect(spyFilterMethod).toHaveBeenCalledWith({ query: 'test' });

    spyFilterMethod.calls.reset();
  });

  it('filteredExercises variable should be updated with the response from the getExercisesSuggestions method after call the filterExercise method', () => {
    const mockExercises: Exercise[] = [ exercise1, exercise2, exercise3 ];

    spyOn(exerciseStoreService, 'getExercisesSuggestions').and.returnValue(mockExercises);

    const query = 'Exercise';
    component.filterExercise({ query });

    expect(component.filteredExercises).toEqual(mockExercises);

    (exerciseStoreService.getExercisesSuggestions as jasmine.Spy).and.callThrough();
  });

  //Use-case: Selecting a search option from selector ---
  it('onSelectExercise method should be called after select the exercise', () => {
    const selectExerciseSpy = spyOn(component, 'onSelectExercise');

    const name = 'Exercise1';
    const selectedSuggestion = { name };
    component.onSelectExercise(selectedSuggestion);

    expect(selectExerciseSpy).toHaveBeenCalledWith(selectedSuggestion);

    selectExerciseSpy.calls.reset();
  });

});
