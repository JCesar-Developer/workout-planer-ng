import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'statistics',
        loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'registers',
        loadChildren: () => import('./modules/registers/registers.module').then(m => m.RegistersModule)
      },
      {
        path: 'workouts',
        loadChildren: () => import('./modules/workouts/workouts.module').then(m => m.WorkoutsModule)
      },
      {
        path: 'exercises',
        loadChildren: () => import('./modules/exercises/exercises.module').then(m => m.ExercisesModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'statistics'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
