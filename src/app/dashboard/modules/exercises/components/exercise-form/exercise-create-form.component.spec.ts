import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category, Exercise } from "@dashboard/shared/interfaces/exercise.interface";
import { ExerciseStoreService } from "@dashboard/shared/services/exercise-store.service";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { CustomValidatorsService } from "src/app/shared/services/customValidators.service";
import { ExerciseFormComponent } from "./exercise-form.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ExerciseImagePipe } from "../../pipes/exercise-image.pipe";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";

describe('ExerciseFormComponent whit previous data', () => {

  const exerciseMock: Exercise = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };

  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExerciseFormComponent,
        ExerciseImagePipe,
      ],
      imports: [
        HttpClientTestingModule,
        DropdownModule,
        ButtonModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        ExerciseStoreService,
        DynamicDialogRef,
        DynamicDialogConfig,
        CustomValidatorsService,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //INICIALIZACIÓN ---
  //El formulario debería crearse con los campos vacíos cuando no se le pasa un ejercicio.
  it('should create the form with empty fields when no exercise is passed', () => {
    expect(component.form.value).toEqual({
      id: null,
      name: null,
      image: null,
      category: Category.CORE,
      alternativeImage: null,
    });
  });

  //La variable CurrentExercise debería ser igual a un Exercise sin valores cuando no se le pasa un ejercicio.
  it('should create the currentExercise variable with an empty Exercise when no exercise is passed', () => {
    expect(component.currentExercise.id).toBeNull();
    expect(component.currentExercise.name).toBeNull();
    expect(component.currentExercise.image).toBeNull();
    expect(component.currentExercise.category).toEqual(Category.CORE);
    expect(component.currentExercise.alternativeImage).toBeNull();
  });

  //VALIDACIONES ---

  //CRUD---
  //Create

  //Cancel
});

