import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { CustomValidatorsService } from 'src/app/shared/services/customValidators.service';

type FormControls = 'id' | 'name' | 'image' | 'category' | 'alternativeImage';

interface ExerciseForm {
  id: FormControl<string|null>;
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

  public exerciseForm: FormGroup<ExerciseForm> = this.fb.group<ExerciseForm>({
    id: this.fb.control(null),
    name: this.fb.control(null, [Validators.required, Validators.minLength(3), this.customValidators.noWhitespace ]),
    image: this.fb.control(null),
    category: this.fb.control(Category.CORE, { nonNullable: true }),
    alternativeImage: this.fb.control(null),
  });

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    private exerciseStoreService: ExerciseStoreService,
  ) {}

  ngOnInit(): void {
    if( this.config.data) {
      const exercise = this.config.data.exercise;
      this.exerciseForm.patchValue( exercise );
    }
  }

  public isInvalidInput( field: FormControls ): boolean | null {
    return this.exerciseForm.controls[field]?.errors && this.exerciseForm.controls[field]?.touched || null;
  }

  public getErrorMessage( field: FormControls ): string | null {
    if( !this.exerciseForm.controls[field] ) return null;

    const errors = this.exerciseForm.controls[field]?.errors || {};

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

  // private getErrorMessage( key: string ): string | null {
  //   switch( key ) {
  //     case 'required':
  //       return 'Este campo es requerido';
  //     case 'minlength':
  //       return `Este campo debe tener al menos ${ errors[key].requiredLength } caracteres`;
  //     case 'whitespace':
  //       return 'Este campo no puede contener solo espacios en blanco';
  //     default:
  //       return null;
  //   }
  // }

  public get exerciseId() {
    // console.log('Cambio detectado');
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

  private onSave( exercise: Exercise ): void {
    this.exerciseStoreService.save(exercise).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" creado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al crear el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()
  }

  private onUpdate( exercise: Exercise ): void {
    this.exerciseStoreService.update(this.currentExercise).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" actualizado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al actualizar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe()

  };

  public onDelete( exerciseId: string ) {
    const exerciseName = this.exerciseForm.get('name')?.value;

    this.exerciseStoreService.delete(exerciseId).pipe(
      tap(success => {
        if( success ) this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exerciseName }" eliminado con éxito` },
        })
        else this.ref.close({
          status: 'error',
          message: { severity: 'error', summary: 'Error', detail: 'Error al eliminar el ejercicio, porfavor, revise su conexión a internet y vuelva a intentarlo' },
        })
      })
    ).subscribe();
  }
}
