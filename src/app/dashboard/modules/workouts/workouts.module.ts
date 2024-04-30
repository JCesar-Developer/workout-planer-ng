import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { PrimeNgModule } from '@primeng/prime-ng.module';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { WorkoutListComponent } from './components/workout-page-list/workout-page-list.component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@shared/shared.module';
import { WorkoutFormSelectorComponent } from './components/workout-form-selector/workout-form-selector.component';
import { ExercisesModule } from '../exercises/exercises.module';
import { WorkoutPageHeaderComponent } from './components/workout-page-header/workout-page-header.component';

@NgModule({
  declarations: [
    WorkoutsPageComponent,
    WorkoutListComponent,
    WorkoutCardComponent,
    WorkoutFormComponent,
    WorkoutFormSelectorComponent,
    WorkoutPageHeaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardSharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
    WorkoutsRoutingModule,
    AppSharedModule,
    ExercisesModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
})
export class WorkoutsModule { }
