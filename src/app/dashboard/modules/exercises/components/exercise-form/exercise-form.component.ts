import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { FormComponent } from '@dashboard/shared/interfaces/form-component.interface';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

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
export class ExerciseFormComponent implements OnInit, OnDestroy, FormComponent<Exercise> {

  public categories: Category[];
  public currentExercise: Exercise = {} as Exercise;
  public exerciseId: string | null = null;
  public form: FormGroup<ExerciseForm> = this.fb.group<ExerciseForm>({
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
    this.$altImg = this.form.get('alternativeImage')?.valueChanges
      .subscribe( altImg => {
        this.currentExercise.alternativeImage = altImg;
        this.setCurrentExercise();
      });
  }

  private setFormIfDataExists(): void {
    if (!this.config.data || !this.config.data.model) return;

    const exercise = this.config.data.model;
    this.form.patchValue( exercise );
    this.exerciseId = exercise.id;
  }

  private setCurrentExercise(): void {
    this.currentExercise = this.form.value as Exercise;
  }

  public isInvalidInput( field: FormControls ): boolean | null {
    //TODO: Se puede abstraer en un servicio para reutilizar en otros componentes.
    return this.form.controls[field]?.errors && this.form.controls[field]?.touched || null;
  }

  //TODO: Se puede abstraer en un servicio para reutilizar en otros componentes.
  public getErrorMessages( field: FormControls ): string | null {
    if( !this.form.controls[field] ) return null;

    const errors = this.form.controls[field]?.errors || {};

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

    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    if( this.exerciseId ) {
      this.update( this.currentExercise );
      return;
    }

    this.save( this.currentExercise );
  }

  public save( exercise: Exercise ): void {
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

  public update( exercise: Exercise ): void {
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
    this.delete( exerciseId );
  }

  public delete( exerciseId: string ) {
    const exerciseName = this.form.get('name')?.value;

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
