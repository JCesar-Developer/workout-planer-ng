import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardMainContainerComponent } from '@dashboard/shared/components/dashboard-main-container/dashboard-main-container.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';

// import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { ExerciseImagePipe } from './pipes/exercise-image.pipe';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppSharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DashboardMainContainerComponent,
    ExerciseCardComponent,
    ExerciseImagePipe,
    // TruncatePipe,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
  ],
  exports: [
    DashboardMainContainerComponent,
    ExerciseCardComponent,
    ExerciseImagePipe,
    // TruncatePipe,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
  ],
})
export class DashboardSharedModule { }
