import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { PrimeNgModule } from '@primeng/prime-ng.module';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { WorkoutSearchbarComponent } from './components/workout-searchbar/workout-searchbar.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';

@NgModule({
  declarations: [
    WorkoutsPageComponent,
    WorkoutSearchbarComponent,
    WorkoutListComponent,
    WorkoutCardComponent,
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    DashboardSharedModule,
    PrimeNgModule,
  ]
})
export class WorkoutsModule { }
