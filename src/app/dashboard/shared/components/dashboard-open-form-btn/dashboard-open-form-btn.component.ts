import { Component, Input } from '@angular/core';
// import { DialogHandler, DialogConfig } from '../../helpers/dialog-handler.helper';

import { DialogConfig, DialogHandlerService } from '../../services/dashboard-services/dialog-handler.service';

@Component({
  selector: 'dashboard-open-form-btn',
  templateUrl: './dashboard-open-form-btn.component.html'
})
export class DashboardOpenFormBtnComponent<T> {

  @Input() dialogConfig!: DialogConfig<T>;
  @Input() slotForm: boolean = false;
  // @Input() model?: T;

  // private dialogHandler!: DialogHandler<T>;

  constructor(
    private dialogHandler: DialogHandlerService<T>,
  ) { }

  ngOnInit(): void {
    // this.setDialogHandler();
    console.log( this.dialogConfig );
    this.dialogHandler.setCustomConfig( this.dialogConfig );
  }

  // private setDialogHandler() {
    // this.dialogHandler = new DialogHandler( this.dialogConfig );
  // }

  public onOpenForm(): void {
    this.dialogHandler.openForm();
  }

}
