import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  @Input() title!: string;

  constructor(
    private exercisesService: ExercisesService,
  ) { }

  //Autocomplete component
  public filteredExercises: Exercise[] = [];
  public selectedExercise: Exercise | null = null;

  public filterExercise( event: any ) {
    this.exercisesService.getExercisesSuggestions(event.query)
    .subscribe( exercises => this.filteredExercises = exercises );
  }

  //Open-btn component
  @Output() onOpenForm: EventEmitter<undefined> = new EventEmitter();

  public openForm(): void {
    this.onOpenForm.emit();
  }

  //Filter-chips component
  @Input() categories?: string[];

}
