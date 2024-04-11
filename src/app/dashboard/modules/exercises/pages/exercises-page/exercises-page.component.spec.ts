import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExercisesPageComponent } from "./exercises-page.component";
import { Component } from "@angular/core";

import { DialogService } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { Category } from "@dashboard/shared/interfaces/exercise.interface";
import { By } from "@angular/platform-browser";

@Component({
  selector: 'exercise-page-header',
  template: '',
})
export class ExercisePageHeaderComponentStub {}

@Component({
  selector: 'exercise-page-list',
  template: '',
})
export class ExercisePageListComponentStub {}

describe("ExercisesPageComponent", () => {
  const exercise = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };

  let component: ExercisesPageComponent;
  let fixture: ComponentFixture<ExercisesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExercisesPageComponent,
        ExercisePageHeaderComponentStub,
        ExercisePageListComponentStub,
      ],
      imports: [
        ToastModule,
      ],
      providers: [
        MessageService,
        DialogService,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesPageComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  //TESTS UNITARIOS
  //Debe renderizar el componente ToastModule
  it('should render ToastModule', () => {
    const toastModule = fixture.nativeElement.querySelector('p-toast');
    expect(toastModule).toBeTruthy();
  })
  //Debe renderizar el componente ExercisePageHeaderComponent
  it('should render ExercisePageHeaderComponent', () => {
    const exercisePageHeader = fixture.nativeElement.querySelector('exercise-page-header');
    expect(exercisePageHeader).toBeTruthy();
  })

  //Debe renderizar el componente ExercisePageListComponent
  it('should render ExercisePageListComponent', () => {
    const exercisePageList = fixture.nativeElement.querySelector('exercise-page-list');
    expect(exercisePageList).toBeTruthy();
  })

  //Deberia tener 'Lista de ejercicios' como titulo
  it('should have "Lista de ejercicios" as title', () => {
    expect(component.title).toBe('Lista de ejercicios');
  })

  //Debería instanciar ExerciseFormHandler en el constructor
  it('should instantiate ExerciseFormHandler in constructor', () => {
    expect(component['formHandler']).toBeTruthy();
  })

  //El método onOpenExerciseForm debería llamar a formHandler.openForm sin argumentos
  it('should call formHandler.openForm in onOpenExerciseForm', () => {
    const openFormSpy = spyOn(component['formHandler'], 'openForm');

    component.onOpenExerciseForm();

    expect(openFormSpy).toHaveBeenCalled();
    expect(openFormSpy).toHaveBeenCalledWith(undefined);

    openFormSpy.calls.reset();
  })

  //El método onOpenExerciseForm debería llamar a formHandler.openForm con el ejercicio pasado como argumento
  it('should call formHandler.openForm in onOpenExerciseForm with exercise as argument', () => {
    const openFormSpy = spyOn(component['formHandler'], 'openForm');

    component.onOpenExerciseForm(exercise);

    expect(openFormSpy).toHaveBeenCalled();
    expect(openFormSpy).toHaveBeenCalledWith(exercise);

    openFormSpy.calls.reset();
  });

  //TESTS DE INTEGRACIÓN
  //ExercisePageHeader debería llamar a onOpenExerciseForm cuando se emita el evento openCreateForm
  it('should call onOpenExerciseForm when openCreateForm event is emitted', () => {
    const onOpenExerciseFormSpy = spyOn(component, 'onOpenExerciseForm');
    const exercisePageHeader = fixture.debugElement.query(By.directive(ExercisePageHeaderComponentStub));

    exercisePageHeader.triggerEventHandler('openCreateForm');

    expect(onOpenExerciseFormSpy).toHaveBeenCalled();


    onOpenExerciseFormSpy.calls.reset();
  });

  //ExercisePageList debería llamar a onOpenExerciseForm cuando se emita el evento openEditForm
  it('should call onOpenExerciseForm when openEditForm event is emitted', () => {
    const onOpenExerciseFormSpy = spyOn(component, 'onOpenExerciseForm');
    const exercisePageList = fixture.debugElement.query(By.directive(ExercisePageListComponentStub));

    exercisePageList.triggerEventHandler('openEditForm', exercise);

    expect(onOpenExerciseFormSpy).toHaveBeenCalled();
    expect(onOpenExerciseFormSpy).toHaveBeenCalledWith(exercise);

    onOpenExerciseFormSpy.calls.reset();
  });

});
