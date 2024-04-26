import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '@primeng/prime-ng.module';

import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHeaderComponent } from './shared/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './shared/components/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    AppSharedModule,
    PrimeNgModule,
  ],
})
export class DashboardModule { }
