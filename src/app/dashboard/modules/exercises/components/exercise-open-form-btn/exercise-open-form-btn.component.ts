import { Component } from '@angular/core';

import { FormCreator } from '@shared/helpers/form-creator.helper';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { ExerciseFormConfigurator } from '../../helpers/exercise-form-config.helper';

import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'exercise-open-form-btn',
  templateUrl: './exercise-open-form-btn.component.html',
})
export class ExerciseOpenFormBtnComponent {

  private formCreator?: FormCreator;
  private formConfigurator?: ExerciseFormConfigurator;

  constructor(
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.formCreator = new FormCreator( this.dialogService, ExerciseFormComponent);
    this.formConfigurator = new ExerciseFormConfigurator();
  }

  public onOpenForm(): void {
    if (this.formCreator && this.formConfigurator) {
      this.formCreator.openForm(this.formConfigurator.config);
    }
  }

}
