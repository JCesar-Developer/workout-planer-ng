import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

@NgModule({
  declarations: [
    WorkoutsPageComponent,
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    DashboardSharedModule,
  ]
})
export class WorkoutsModule { }
