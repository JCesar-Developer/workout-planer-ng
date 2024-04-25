import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExerciseFormComponent  } from '@exercises/components/exercise-form/exercise-form.component';
import { FormCreator } from '@shared/helpers/form-creator.helper';
import { Exercise } from '@dashboard/shared/models/exercise.interface';

import { DialogService } from 'primeng/dynamicdialog';
import { ExerciseFormConfigurator } from '@dashboard/modules/exercises/helpers/exercise-form-config.helper';

@Component({
  selector: 'exercise-card',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent implements OnInit {

  @Input() public exercise!: Exercise;
  @Input() public sets?: number;
  @Input() public reps?: number;
  @Input() public editable?: boolean = false;
  @Input() public clickable?: boolean = false;
  @Output() public emitExercise: EventEmitter<Exercise> = new EventEmitter();

  private formCreator?: FormCreator;
  private formConfigurator?: ExerciseFormConfigurator;

  constructor( private dialogService: DialogService ){}

  ngOnInit(): void {
    this.formConfigurator = new ExerciseFormConfigurator(this.exercise);
    this.formCreator = new FormCreator( this.dialogService, ExerciseFormComponent);
  }

  public onOpenForm() {
    if (this.formCreator && this.formConfigurator) {
      this.formCreator.openForm(this.formConfigurator.config);
    }
  }

  onEmitExercise() {
    if( !this.clickable ) return;
    this.emitExercise.emit(this.exercise);
  }

}
