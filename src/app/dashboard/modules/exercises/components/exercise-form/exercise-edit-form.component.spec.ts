import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category, Exercise } from "@dashboard/shared/interfaces/exercise.interface";
import { ExerciseStoreService } from "@dashboard/shared/services/exercise-store-actions.service";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { CustomValidatorsService } from "src/app/shared/services/customValidators.service";
import { ExerciseFormComponent } from "./exercise-form.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ExerciseImagePipe } from "../../pipes/exercise-image.pipe";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";

describe('ExerciseFormComponent whit previous data', () => {

  const exerciseMock: Exercise = {
    id: '1',
    name: 'Exercise 1',
    category: Category.CHEST,
    image: './assets/images/exercises/exercise-1.gif',
    alternativeImage: null,
  };

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
        CustomValidatorsService,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { exercise: exerciseMock } }
        },
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
  //El formulario debería crearse con los campos llenos cuando se le pasa un ejercicio.
  it('should create the form with filled fields when an exercise is passed', () => {
    expect(component.form.value).toEqual(exerciseMock);
  });

  //La variable CurrentExercise debería ser igual al ejercicio que se le pasa a través del config data.
  it('should set currentExercise to the exercise passed through config data', () => {
    expect(component.currentExercise).toEqual(exerciseMock);
  });

  //VALIDACIONES

  //CRUD
  //Update

  //Delete

});
