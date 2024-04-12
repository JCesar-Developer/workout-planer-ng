import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardMainContainerComponent } from '@dashboard/shared/components/dashboard-main-container/dashboard-main-container.component';

@NgModule({
  declarations: [
    DashboardMainContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DashboardMainContainerComponent,
  ]
})
export class DashboardSharedModule { }
