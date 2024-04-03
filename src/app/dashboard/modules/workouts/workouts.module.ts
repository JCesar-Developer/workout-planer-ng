import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';

@NgModule({
  declarations: [
    WorkoutsPageComponent,
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule
  ]
})
export class WorkoutsModule { }
