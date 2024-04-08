import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CustomValidatorsService } from 'src/app/shared/services/customValidators.service';

interface ExerciseForm {
  id: FormControl<number|null>;
  name: FormControl<string|null>;
  image?: FormControl<string|null>;
  category: FormControl<Category>;
  alternativeImage?: FormControl<string|null>;
}

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnInit {

  // TODO: No entiendo la diferencia entre usar FormGroup y FormBuilder
  // public exerciseForm: FormGroup = new FormGroup<ExerciseForm>({
  //   id: new FormControl(null),
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  //   image: new FormControl(null),
  //   category: new FormControl<Category>(Category.CORE, { nonNullable: true }),
  //   alternativeImage: new FormControl<string|null>(null),
  // });

  public exerciseForm: FormGroup = this.fb.group<ExerciseForm>({
    id: this.fb.control(null),
    name: this.fb.control(null, [Validators.required, Validators.minLength(3), this.customValidators.noWhitespace ]),
    image: this.fb.control(null),
    category: this.fb.control(Category.CORE, { nonNullable: true }),
    alternativeImage: this.fb.control(null),
  });

  constructor(
    private exercisesService: ExercisesService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
  ) {}

  ngOnInit(): void {
    if( this.config.data) {
      const exercise = this.config.data.exercise;
      this.exerciseForm.patchValue( exercise );
    }
  }

  public isInvalidInput( field: string ): boolean | null {
    return this.exerciseForm.controls[field].errors && this.exerciseForm.controls[field].touched;
  }

  public getErrorMessage( field: string ): string | null {
    if( !this.exerciseForm.controls[field] ) return null;

    const errors = this.exerciseForm.controls[field].errors || {};

    for( const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${ errors[key].requiredLength } caracteres`;
        case 'whitespace':
          return 'Este campo no puede contener solo espacios en blanco';
        default:
          return null;
      }
    }

    return null;
  }

  public get exerciseId() {
    return this.exerciseForm.get('id')?.value;
  }

  public get currentExercise(): Exercise {
    return this.exerciseForm.value as Exercise;
  }

  public get categories(): Category[] {
    return Object.values(Category).filter(category => category !== Category.ALL);
  }


  public closeDialog() {
    this.ref.close();
  }

  public onSubmit() {
    if( this.exerciseForm.invalid ) {
      this.exerciseForm.markAllAsTouched();
      this.exerciseForm.valueChanges.subscribe( value => console.log(value) );
      return;
    }

    if( this.exerciseId ) {
      this.onUpdate( this.currentExercise );
      return;
    }

    this.onSave( this.currentExercise );
  }

  private onUpdate( exercise: Exercise ): void {
    this.exercisesService.update(this.currentExercise)
    .subscribe({
      next: exercise => {
        this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" actualizado con éxito` },
        });
      },
      error: error => {
        this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: error.message },
        });
      }
    });
  }

  private onSave( exercise: Exercise ): void {
    this.exercisesService.save(this.currentExercise)
    .subscribe({
      next: exercise => {
        this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio ${ exercise.name } guardado con éxito` },
        });
      },
      error: error => {
        this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: error.message },
        });
      }
    });
  }

  public onDelete( exerciseId: number ) {
    const exerciseName = this.exerciseForm.get('name')?.value;

    this.exercisesService.delete(exerciseId)
    .subscribe({
      next: () => {
        this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exerciseName }" eliminado con éxito` },
        });
      },
      error: error => {
        this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: error.message },
        });
      }
    });
  }
}
