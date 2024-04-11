import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store.service';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription, tap } from 'rxjs';
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
export class ExerciseFormComponent implements OnInit, OnDestroy {

  public categories: Category[];
  public currentExercise: Exercise = {} as Exercise;
  public exerciseId: string | null = null;
  public exerciseForm: FormGroup<ExerciseForm> = this.fb.group<ExerciseForm>({
    id: this.fb.control(null),
    name: this.fb.control(null, [Validators.required, Validators.minLength(3), this.customValidators.noWhitespace ]),
    image: this.fb.control(null),
    category: this.fb.control(Category.CORE, { nonNullable: true }),
    alternativeImage: this.fb.control(null),
  });
  private $altImg?: Subscription;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    private exerciseStoreService: ExerciseStoreService,
  ) {
    this.categories = exerciseStoreService.getExerciseCategories();
    this.setFormIfDataExists();
    this.setCurrentExercise();
  }

  ngOnInit(): void {
    this.$altImg = this.exerciseForm.get('alternativeImage')?.valueChanges
      .subscribe( altImg => {
        this.currentExercise.alternativeImage = altImg;
        this.setCurrentExercise();
      });
  }

  private setFormIfDataExists(): void {
    if (!this.config.data || !this.config.data.exercise) return;

    const exercise = this.config.data.exercise;
    this.exerciseForm.patchValue( exercise );
    this.exerciseId = exercise.id;
  }

  private setCurrentExercise(): void {
    this.currentExercise = this.exerciseForm.value as Exercise;
  }

  public isInvalidInput( field: FormControls ): boolean | null {
    //TODO: Se puede abstraer en un servicio para reutilizar en otros componentes.
    return this.exerciseForm.controls[field]?.errors && this.exerciseForm.controls[field]?.touched || null;
  }

  //TODO: Se puede abstraer en un servicio para reutilizar en otros componentes.
  public getErrorMessages( field: FormControls ): string | null {
    if( !this.exerciseForm.controls[field] ) return null;

    const errors = this.exerciseForm.controls[field]?.errors || {};

    for( const key of Object.keys(errors) ) {
      return this.getErrorMessage( key, errors );
    }

    return null;
  }

  private getErrorMessage( key: string, errors: ValidationErrors ): string | null {
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

  public onSubmit() {
    this.setCurrentExercise();

    if( this.exerciseForm.invalid ) {
      this.exerciseForm.markAllAsTouched();
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

  public closeDialog() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.$altImg?.unsubscribe();
  }
}
