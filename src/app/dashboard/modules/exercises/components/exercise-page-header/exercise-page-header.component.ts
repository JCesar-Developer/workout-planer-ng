import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  @Input() title: string = 'Title goes here';
  @Output() openCreateForm: EventEmitter<undefined> = new EventEmitter();

  public openForm(): void {
    this.openCreateForm.emit();
  }
}
