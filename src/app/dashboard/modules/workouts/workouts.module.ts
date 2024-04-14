import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { PrimeNgModule } from '@primeng/prime-ng.module';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { WorkoutSearchbarComponent } from './components/workout-searchbar/workout-searchbar.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';

import { MessageService } from 'primeng/api';
import { WorkoutOpenFormBtnComponent } from './components/workout-open-form-btn/workout-open-form-btn.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutCardCarouselComponent } from './components/workout-card-carousel/workout-card-carousel.component';
import { AppSharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    WorkoutsPageComponent,
    WorkoutSearchbarComponent,
    WorkoutListComponent,
    WorkoutCardComponent,
    WorkoutOpenFormBtnComponent,
    WorkoutFormComponent,
    WorkoutCardCarouselComponent,
  ],
  imports: [
    CommonModule,
    DashboardSharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
    WorkoutsRoutingModule,
    AppSharedModule,
  ],
  providers: [
    MessageService,
  ],
})
export class WorkoutsModule { }
