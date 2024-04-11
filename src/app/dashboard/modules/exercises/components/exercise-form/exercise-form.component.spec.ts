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

describe('ExerciseFormComponent', () => {

  const exerciseMock = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };

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
        CustomValidatorsService
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

  //El formulario debería crearse con los campos vacíos cuando no se le pasa un ejercicio.
  it('should create the form with empty fields when no exercise is passed', () => {
    expect(component.exerciseForm.value).toEqual({
      id: null,
      name: null,
      image: null,
      category: Category.CORE,
      alternativeImage: null,
    });
  });

  //El formulario debería crearse con los campos llenos cuando se le pasa un ejercicio.
  it('should create the form with filled fields when an exercise is passed', () => {
    TestBed.overrideProvider(DynamicDialogConfig, { useValue: { data: { exercise: exerciseMock } } });

    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.exerciseForm.value).toEqual(exerciseMock);
  });

});


//INICIALIZACIÓN

//La variable CurrentExercise debería ser igual a null cuando no se le pasa un ejercicio.
//La variable CurrentExercise debería ser igual al ejercicio que se le pasa a través del config data.

//VALIDACIONES

//CRUD
