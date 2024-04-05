import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@primeng/prime-ng.module';

import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';

import { ExerciseImagePipe } from './pipes/exercise-image.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExercisePageHeaderComponent } from './components/exercise-page-header/exercise-page-header.component';
import { ExercisePageListComponent } from './components/exercise-page-list/exercise-page-list.component';


@NgModule({
  declarations: [
    ExercisesPageComponent,
    ExerciseCardComponent,
    ExerciseFormComponent,
    ExerciseImagePipe,
    TruncatePipe,
    ExercisePageHeaderComponent,
    ExercisePageListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PrimeNgModule,
    ExercisesRoutingModule,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
  ],
})
export class ExercisesModule { }
