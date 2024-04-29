import { Component, Input } from '@angular/core';
import { DialogHandler, DialogConfig } from '../../helpers/dialog-handler.helper';

@Component({
  selector: 'dashboard-open-form-btn',
  templateUrl: './dashboard-open-form-btn.component.html'
})
export class DashboardOpenFormBtnComponent<T> {

  @Input() dialogConfig!: DialogConfig<T>;
  @Input() slotForm: boolean = false;
  @Input() model?: T;

  private dialogHandler!: DialogHandler<T>;

  ngOnInit(): void {
    this.setDialogHandler();
  }

  private setDialogHandler() {
    this.dialogHandler = new DialogHandler( this.dialogConfig );
  }

  public onOpenForm(): void {
    this.dialogHandler.openForm();
  }

}
