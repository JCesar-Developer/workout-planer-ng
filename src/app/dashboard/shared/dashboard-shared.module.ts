import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardMainContainerComponent } from '@dashboard/shared/components/dashboard-main-container/dashboard-main-container.component';

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppSharedModule } from '@shared/shared.module';
import { SearchbarComponent } from './components/dashboard-searchbar/dashboard-searchbar.component';
import { PrimeNgModule } from '@/prime-ng/prime-ng.module';
import { DashboardOpenFormBtnComponent } from './components/dashboard-open-form-btn/dashboard-open-form-btn.component';


@NgModule({
  declarations: [
    DashboardMainContainerComponent,
    SearchbarComponent,
    DashboardOpenFormBtnComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    PrimeNgModule,
  ],
  exports: [
    DashboardMainContainerComponent,
    DashboardOpenFormBtnComponent,
    SearchbarComponent,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
  ],
})
export class DashboardSharedModule { }
