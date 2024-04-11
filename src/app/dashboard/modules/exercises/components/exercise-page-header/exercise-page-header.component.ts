import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'exercise-page-header',
  templateUrl: './exercise-page-header.component.html',
})
export class ExercisePageHeaderComponent {

  @Input() title: string = 'Title goes here';
  @Output() openCreateForm: EventEmitter<void> = new EventEmitter();

  public onOpenForm(): void {
    this.openCreateForm.emit();
  }
}
