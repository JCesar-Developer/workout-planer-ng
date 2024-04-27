import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Exercise } from '@dashboard/shared/models/exercise.interface';
import { Workout } from '@dashboard/shared/models/workout-interface';
import { WorkoutHttpService } from '@dashboard/shared/services/http-services/workout-http.service';

import { ExerciseStoreActionsService } from '@/dashboard/shared/services/store-services/exercise-store-actions.service';
import { WorkoutStoreActionsService } from '@/dashboard/shared/services/store-services/workout-store-actions.service';

import { FormActions } from '@dashboard/shared/helpers/form-actions.helper';
import { workoutToastMessages } from '@workouts/helpers/workout-toast-messages.helper';

import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { workoutDialogConfig } from '@workouts/helpers/workout-dialog-config.helper';
import { DialogHandler, DialogHandlerConfig } from '@/dashboard/shared/helpers/dialog-handler.helper';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'workout-card',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {

  @Input() workout!: Workout;
  public exercises?: Exercise[];
  public exerciseSets?: number[];
  public exerciseReps?: number[];

  private exercisesSubs$?: Subscription;
  private dialogHelper!: DialogHandler<Workout>;
  private formActions: FormActions<Workout>;

  constructor(
    private dialogService: DialogService,
    private exerciseStoreActions: ExerciseStoreActionsService,
    private workoutHttp: WorkoutHttpService,
    private workoutStoreActions: WorkoutStoreActionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.formActions = new FormActions(this.workoutHttp, this.workoutStoreActions, this.messageService, workoutToastMessages);
  }

  ngOnInit(): void {
    this.setExercises();

    const dialogConfig: DialogHandlerConfig<Workout> = {
      dialogService: this.dialogService,
      component: WorkoutFormComponent,
      customDialogConfig: workoutDialogConfig,
      model: this.workout,
      modelName: 'Rutina',
    }


    this.dialogHelper = new DialogHandler( dialogConfig );
  }

  ngOnDestroy(): void {
    if( this.exercisesSubs$ ) this.exercisesSubs$?.unsubscribe();
  }

  private setExercises(): void {
    const exercisesIds: string[] = this.workout.categorizedExercises.map( catEx => catEx.exerciseId );
    this.exercises = this.exerciseStoreActions.getExercisesById( exercisesIds );
    this.exerciseSets = this.workout.categorizedExercises.map( catEx => catEx.sets );
    this.exerciseReps = this.workout.categorizedExercises.map( catEx => catEx.reps );
  }

  public get onOpenForm() {
    return () => this.dialogHelper.openForm();
  }

  onConfirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Estas seguro de que quieres eliminar este entrenamiento?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.onDeleteWorkout(),
    });
  }

  private onDeleteWorkout(): void {
    this.formActions.delete( this.workout );
  }

}
