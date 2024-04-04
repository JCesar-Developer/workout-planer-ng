import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@dashboard/shared/interfaces/exercise.interface';
import { ExercisesService } from '@dashboard/shared/services/exercises.service';
import type { Message } from 'primeng/api';

interface ExerciseForm {
  name: FormControl<string|null>;
  category: FormControl<Category>;
  alternativeImage?: FormControl<string|null>;
}

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnInit {

  @Input()
  public visible: boolean = false;

  @Input()
  public exercise?: Exercise | undefined;

  @Output()
  public onChangeVisible = new EventEmitter<boolean>();

  @Output()
  public onEmitAlert = new EventEmitter<Message>();

  public exerciseForm: FormGroup = new FormGroup<ExerciseForm>({
    name: new FormControl(null, Validators.required),
    category: new FormControl<Category>(Category.CORE, { nonNullable: true }),
    alternativeImage: new FormControl<string|null>(null),
  });

  public categories: Category[] = [];

  constructor(
    private exercisesService: ExercisesService,
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

  closeDialog() {
    this.visible = false;
    this.onChangeVisible.emit(this.visible);
    setTimeout(() => {
      this.exerciseForm.reset();
    }, 500);
  }

  onSubmit() {
    if( this.exerciseForm.invalid ) {
      this.onEmitAlert.emit({ severity: 'error', summary: 'Error', detail: 'Faltan campos obligatorios' });
      return;
    }

    this.exercisesService.save(this.currentExercise)
    .subscribe( exercise => {
      this.onChangeVisible.emit(false);
      this.onEmitAlert.emit({ severity: 'success', summary: 'Success', detail: `Ejercicio ${ exercise.name } guardado` });
    });
  }

  public onShow( e: any ) {
    console.log(e);
  }
}
