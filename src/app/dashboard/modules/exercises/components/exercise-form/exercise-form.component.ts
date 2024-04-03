import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';
import { MessageService } from 'primeng/api';

interface ExerciseForm {
  name: FormControl<string|null>;
  category: FormControl<Category>;
  alternativeImage?: FormControl<string|null>;
}

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
  providers: [MessageService]
})
export class ExerciseFormComponent implements OnInit {

  @Input()
  public visible: boolean = false;

  @Output()
  public onChangeVisible = new EventEmitter<boolean>();

  public exerciseForm: FormGroup = new FormGroup<ExerciseForm>({
    name: new FormControl(null, Validators.required),
    category: new FormControl<Category>(Category.CORE, { nonNullable: true }),
    alternativeImage: new FormControl<string|null>(null),
  });

  public categories: Category[] = [];

  constructor(
    private exercisesService: ExercisesService,
    private messageService: MessageService,
  ) {}

  get currentExercise(): Exercise {
    return this.exerciseForm.value as Exercise;
  }

  ngOnInit(): void {
    Object.values(Category).forEach( category => {
      this.categories.push( category );
    });
    this.categories.forEach( category => {
      if ( category === Category.ALL ) {
        this.categories.splice(this.categories.indexOf(category), 1);
      }
    })
  }

  onHide() {
    this.onChangeVisible.emit(this.visible);
  }

  onSubmit() {
    console.log(this.exerciseForm.value);

    console.log('Valid', this.exerciseForm.valid);

    if( this.exerciseForm.invalid ) {
      this.messageService.add({ severity: 'danger', summary: 'Danger!', detail: 'Message Content' });
      return;
    }

    this.exercisesService.save(this.currentExercise)
    .subscribe( exercise => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    });
  }
}
