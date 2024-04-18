import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

import { CustomValidatorsService } from '@shared/services/custom-validators.service';
import { InputErrorMessageService } from '@shared/services/input-error-message.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
})
export class WorkoutFormComponent implements OnInit {

  public form!: FormGroup;
  public exercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorsService,
    private inputErrorMessages: InputErrorMessageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.min(8), this.customValidator.noWhitespace]],
      duration: [0, [Validators.required, Validators.min(20)]],
      categorizedExercises: this.fb.array([]),
    }, {
      validators: [ this.customValidator.atLeastTwoExercises() ]
    });
  }

  get categorizedExercises() {
    return this.form.get('categorizedExercises') as FormArray;
  }

  //TODO: Faltan los mensajes personalizados
  public isInvalidField(field: string): boolean | null {
    return this.inputErrorMessages.isInvalidField(this.form, field);
  }

  public onAddNewExercise( exercise: Exercise ): void {
    this.exercises.push( exercise );
    this.categorizedExercises.push(
      this.fb.group({
        exerciseId: [exercise.id],
        sets: [0],
        reps: [0],
        rest: [0]
      })
    );
  }

  public onDeleteExercise( index: number ): void {
    this.categorizedExercises.removeAt( index );
  }

  // CRUD ---
  public onSubmit(): void {
    console.log(this.form.value);
    console.log('isValid:', this.form.valid);
    console.log('errors:', this.form.errors);
    if (this.form.errors && this.form.errors['atLeastTwoExercises']) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Una rutina debe tener al menos 2 ejercicios'
      });
    }

    if ( !this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }


  }

  public onDelete(modelId: string | number): void {
    throw new Error('Method not implemented.');
  }

}
