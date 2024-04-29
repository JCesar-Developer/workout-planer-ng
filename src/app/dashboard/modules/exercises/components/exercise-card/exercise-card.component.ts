import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Exercise } from '@dashboard/shared/models/exercise.interface';

import { ExerciseDialogConfig } from '@exercises/helpers/exercise-dialog-config.helper'
import { DialogSetup } from '@/dashboard/shared/services/dashboard-services/dialog-handler.service';


@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent implements OnInit {

  @Input() public exercise!: Exercise;
  @Input() public sets?: number;
  @Input() public reps?: number;
  @Input() public editable: boolean = false;
  @Input() public clickable: boolean = false;
  @Output() public onEmitExercise: EventEmitter<Exercise> = new EventEmitter();

  public dialogConfig!: DialogSetup<Exercise>;

  ngOnInit(): void {
    this.dialogConfig = new ExerciseDialogConfig(this.exercise).config;
  }

  public onClickCard(): void {
    if( !this.clickable ) return;
    this.onEmitExercise.emit(this.exercise);
  }

}
