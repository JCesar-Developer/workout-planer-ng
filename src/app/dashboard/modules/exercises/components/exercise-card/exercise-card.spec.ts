import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseCardComponent } from './exercise-card.component';
import { ExerciseImagePipe } from '../../pipes/exercise-image.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';

describe('ExerciseCardComponent', () => {
  let component: ExerciseCardComponent;
  let fixture: ComponentFixture<ExerciseCardComponent>;
  const EXERCISE_MODEL = { id: 1, name: 'Exercise 1', category: Category.CORE, image: 'image1.jpg', alternativeImage: 'alternative-image1.jpg',};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCardComponent, ExerciseImagePipe, TruncatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseCardComponent);
    component = fixture.componentInstance;
  });

  it('Should throw an error if the input is not passed', () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrowError();
  });

  it('should render the component after pass an Input', () =>  {
    const inputExercise: Exercise = EXERCISE_MODEL;
    component.exercise = inputExercise;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should render the component with the correct exercise props', () => {
    const inputExercise: Exercise = EXERCISE_MODEL;
    component.exercise = inputExercise;
    fixture.detectChanges();

    const rootElement = fixture.nativeElement;
    expect(rootElement.querySelector('img').src).toContain(inputExercise.image);
    expect(rootElement.querySelector('[data-testid="exercise-name"]').textContent).toContain(inputExercise.name);
    expect(rootElement.querySelector('[data-testid="exercise-category"]').textContent).toContain(inputExercise.category);
  });

  it('should run the editExercise method after click on edit button', () => {
    const inputExercise: Exercise = EXERCISE_MODEL;
    component.exercise = inputExercise;
    fixture.detectChanges();

    const editExerciseSpy = spyOn(component, 'editExercise');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(editExerciseSpy).toHaveBeenCalled();
  });

  it('should emit the exercise after click on edit button', () => {
    const inputExercise: Exercise = EXERCISE_MODEL;
    component.exercise = inputExercise;
    fixture.detectChanges();

    const editExerciseSpy = spyOn(component.onEditExercise, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(editExerciseSpy).toHaveBeenCalledWith(inputExercise);
  });
});
