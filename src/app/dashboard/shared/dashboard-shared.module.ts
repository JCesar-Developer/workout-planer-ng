import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardMainContainerComponent } from '@dashboard/shared/components/dashboard-main-container/dashboard-main-container.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';

// import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { ExerciseImagePipe } from './pipes/exercise-image.pipe';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppSharedModule } from '@shared/shared.module';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { PrimeNgModule } from '@/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    DashboardMainContainerComponent,
    ExerciseCardComponent,
    ExerciseImagePipe,
    SearchbarComponent,
    // TruncatePipe,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    PrimeNgModule,
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
