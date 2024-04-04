import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import type { Message } from 'primeng/api';

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

  // public exercise?: Exercise;

  @Output()
  public onEmitAlert = new EventEmitter<Message>();

  public exerciseForm: FormGroup = new FormGroup<ExerciseForm>({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    image: new FormControl(null),
    category: new FormControl<Category>(Category.CORE, { nonNullable: true }),
    alternativeImage: new FormControl<string|null>(null),
  });

  public categories: Category[] = [];

  constructor(
    private exercisesService: ExercisesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  get exerciseId() {
    return this.exerciseForm.get('id')?.value;
  }

  get currentExercise(): Exercise {
    return this.exerciseForm.value as Exercise;
  }

  ngOnInit(): void {
    if( this.config.data) {
      const exercise = this.config.data.exercise;
      this.exerciseForm.patchValue( exercise );
    }

    this.categories = this.getExercises();
  }

  private getExercises(): Category[] {
    let categories: Category[] = [];

    Object.values(Category).forEach( category => {
      categories.push( category );
    });

    categories.forEach( category => {
      if ( category === Category.ALL ) {
        categories.splice(categories.indexOf(category), 1);
      }
    })

    return categories;
  }

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
    if( this.exerciseForm.invalid ) return;

    if( this.exerciseId ) {
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

      return;
    }

    this.exercisesService.save(this.currentExercise)
    .subscribe({
      next: exercise => {
        this.ref.close({
          status: 'success',
          message: { severity: 'success', summary: 'Success', detail: `Ejercicio "${ exercise.name }" guardado con éxito` },
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
