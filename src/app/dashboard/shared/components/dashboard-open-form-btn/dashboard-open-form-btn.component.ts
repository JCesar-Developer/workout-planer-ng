import { Component, Input } from '@angular/core';

import { DialogSetup, DialogHandlerService } from '@dashboard/shared/services/dashboard-services/dialog-handler.service';

@Component({
  selector: 'dashboard-open-form-btn',
  templateUrl: './dashboard-open-form-btn.component.html'
})
export class DashboardOpenFormBtnComponent<T> {

  @Input() dialogConfig!: DialogSetup<T>;
  @Input() slotForm: boolean = false;

  constructor(
    private dialogHandler: DialogHandlerService<T>,
  ) { }

  public onOpenForm(): void {
    this.dialogHandler.openDialog( this.dialogConfig );
  }

}
