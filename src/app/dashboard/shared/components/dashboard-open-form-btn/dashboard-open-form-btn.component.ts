import { Component, Input } from '@angular/core';
import { DialogHandler, DialogHandlerConfig } from '../../helpers/dialog-handler.helper';

@Component({
  selector: 'dashboard-open-form-btn',
  templateUrl: './dashboard-open-form-btn.component.html'
})
export class DashboardOpenFormBtnComponent<T> {

  @Input() dialogConfig!: DialogHandlerConfig<T>;
  @Input() slotForm: boolean = false;
  @Input() model?: T;

  private dialogHelper!: DialogHandler<T>;

  ngOnInit(): void {
    this.setDialogHelper();
  }

  private setDialogHelper() {
    this.dialogHelper = new DialogHandler( this.dialogConfig );
  }

  public onOpenForm(): void {
    this.dialogHelper.openForm();
  }

}
