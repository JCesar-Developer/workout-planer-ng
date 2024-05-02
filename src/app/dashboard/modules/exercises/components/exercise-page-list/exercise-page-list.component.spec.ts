import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExercisePageListComponent } from "./exercise-page-list.component";
import { ExerciseCardComponent } from "../exercise-card/exercise-card.component";

import { ExerciseStoreService } from "@dashboard/shared/services/exercise-store-actions.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Subject, of } from "rxjs";
import { Category, Exercise } from "@dashboard/shared/interfaces/exercise.interface";
import { ExerciseImagePipe } from "../../pipes/exercise-image.pipe";
import { TruncatePipe } from "@shared/pipes/truncate.pipe";
import { By } from "@angular/platform-browser";

describe("ExercisePageListComponent", () => {

  let fixture: ComponentFixture<ExercisePageListComponent>;
  let component: ExercisePageListComponent;
  let exerciseStoreService: ExerciseStoreService;
  let compiled: HTMLElement;

  const exercise1 = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };
  const exercise2 = { id: '2', name: 'Exercise 2', category: Category.LEGS, image: './assets/images/exercises/exercise-2.gif' };
  const exercise3 = { id: '3', name: 'Exercise 3', category: Category.CORE, image: './assets/images/exercises/exercise-3.gif' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExercisePageListComponent,
        ExerciseCardComponent,
        ExerciseImagePipe,
        TruncatePipe,
      ],
      providers: [
        ExerciseStoreService,
      ],
      imports: [
        HttpClientTestingModule,
        CommonModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePageListComponent);
    component = fixture.componentInstance;
    exerciseStoreService = TestBed.inject(ExerciseStoreService);
    compiled = fixture.nativeElement;
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // TEMPLATE ---
  it('should not render any card if there are no exercises', () => {
    const cardElements = compiled.querySelectorAll('[data-testid="card-item"]');

    expect(cardElements.length).toBe(0);
  });

  it('should render as many cards as exercises', () => {
    component.exercises = [exercise1, exercise2, exercise3];
    fixture.detectChanges();

    const cardElements = compiled.querySelectorAll('[data-testid="card-item"]');
    expect(cardElements.length).toBe(3);
  });

  it('should call openExerciseForm when edit button is clicked', () => {
    const openExerciseFormSpy = spyOn(component, 'openExerciseForm');
    component.exercises = [exercise1, exercise2, exercise3];
    fixture.detectChanges();

    const exerciseCard = fixture.debugElement.query( By.directive(ExerciseCardComponent) );
    const editButton = exerciseCard.query( By.css('button') );
    editButton.triggerEventHandler('click');

    expect(openExerciseFormSpy).toHaveBeenCalled();
    expect(openExerciseFormSpy).toHaveBeenCalledWith(exercise1);

    openExerciseFormSpy.calls.reset();
  });

  //TS ---
  it('should call getAll method from exerciseStoreService', () => {
    const getAllSpy = spyOn(exerciseStoreService, 'getAll').and.returnValue(of([]));
    component = new ExercisePageListComponent(exerciseStoreService);

    expect(getAllSpy).toHaveBeenCalled();

    getAllSpy.calls.reset();
  });

  //Debería actualizar la propiedad exercises cuando se emita un nuevo valor
  it('should update exercises property when a new value is emitted', () => {
    const subject = new Subject<Exercise[]>();
    let exercisesMock: Exercise[];

    exercisesMock = [exercise1];
    const getAllSpy= spyOn(exerciseStoreService, 'getAll').and.returnValue(subject.asObservable());

    component = new ExercisePageListComponent(exerciseStoreService);

    // The subscription emits a first value
    const subscription = component.$exercises;
    subject.next(exercisesMock);

    expect(component.exercises).toEqual(exercisesMock);

    // The subscription emits a new value
    exercisesMock = [exercise1, exercise2];
    subject.next(exercisesMock);

    expect(component.exercises).toEqual(exercisesMock);

    getAllSpy.calls.reset();
    subscription.unsubscribe();
  });

  it('should emit the exercise received as argument', () => {
    const exercise = exercise1;
    const openEditFormSpy = spyOn(component.openEditForm, 'emit');

    component.openExerciseForm(exercise);

    expect(openEditFormSpy).toHaveBeenCalled();
    expect(openEditFormSpy).toHaveBeenCalledWith(exercise);

    openEditFormSpy.calls.reset();
  });

  it('should unsubscribe from the observable when the component is destroyed', () => {
    const subscription = component.$exercises;
    const unsubscribeSpy = spyOn(subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();

    unsubscribeSpy.calls.reset();
  });

})
