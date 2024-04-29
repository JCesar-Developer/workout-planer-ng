import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ConfirmationService, MessageService } from 'primeng/api';

import { PrimeNgModule } from '@primeng/prime-ng.module';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

import { AppSharedModule } from '@/shared/shared.module';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { ExerciseFilterTabsComponent } from './components/exercise-filter-tabs/exercise-filter-tabs.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExercisePageHeaderComponent } from './components/exercise-page-header/exercise-page-header.component';
import { ExercisePageListComponent } from './components/exercise-page-list/exercise-page-list.component';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';

import { ExerciseImagePipe } from './pipes/exercise-image.pipe';

@NgModule({
  declarations: [
    ExerciseCardComponent,
    ExerciseFilterTabsComponent,
    ExerciseFormComponent,
    ExerciseImagePipe,
    ExercisePageHeaderComponent,
    ExercisePageListComponent,
    ExercisesPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PrimeNgModule,
    ExercisesRoutingModule,
    DashboardSharedModule,
    AppSharedModule,
  ],
  exports: [
    ExerciseCardComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})
export class ExercisesModule { }
