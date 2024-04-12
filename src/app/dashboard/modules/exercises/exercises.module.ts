import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { DashboardSharedModule } from '@dashboard/shared/dashboard-shared.module';

import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExercisePageHeaderComponent } from './components/exercise-page-header/exercise-page-header.component';
import { ExercisePageListComponent } from './components/exercise-page-list/exercise-page-list.component';
import { ExerciseSearchbarComponent } from './components/exercise-searchbar/exercise-searchbar.component';
import { ExerciseFilterTabsComponent } from './components/exercise-filter-tabs/exercise-filter-tabs.component';

import { ExerciseImagePipe } from './pipes/exercise-image.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    ExercisesPageComponent,
    ExerciseCardComponent,
    ExerciseFormComponent,
    ExerciseImagePipe,
    TruncatePipe,
    ExercisePageHeaderComponent,
    ExercisePageListComponent,
    ExerciseSearchbarComponent,
    ExerciseFilterTabsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PrimeNgModule,
    ExercisesRoutingModule,
    DashboardSharedModule,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
  ],
})
export class ExercisesModule { }
