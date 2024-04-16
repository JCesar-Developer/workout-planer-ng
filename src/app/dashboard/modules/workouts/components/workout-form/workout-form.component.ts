import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidatorsService } from '@shared/services/custom-validators.service';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
})
export class WorkoutFormComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorsService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.min(8), this.customValidator.noWhitespace]],
      duration: [0, [Validators.required]],
      exercises: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  // CRUD ---
  public onSubmit(): void {
    console.log(this.form.value);
  }

  public onDelete(modelId: string | number): void {
    throw new Error('Method not implemented.');
  }

}
