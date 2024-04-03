import { Component, OnInit } from '@angular/core';
import { type Exercise, Category } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  providers: [MessageService]
})
export class ExercisesPageComponent implements OnInit {

  public title: string = 'Lista de ejercicios';

  public selectedExercise: Exercise | null = null;
  public filteredExercises: Exercise[] = [];

  public formVisible: boolean = false;

  public exercises: Exercise[] = [];
  public categories: Category[] = Object.values(Category);

  constructor(
    private exercisesService: ExercisesService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.exercisesService.getExercises()
      .subscribe( exercises => this.exercises = exercises );
  }

  public filterExercise( event: any ) {
    this.exercisesService.getExercisesSuggestions(event.query)
    .subscribe( exercises => this.filteredExercises = exercises );
  }

  public toggleFormVisibility(visibility: boolean) {
    this.formVisible = visibility;
  }
}
