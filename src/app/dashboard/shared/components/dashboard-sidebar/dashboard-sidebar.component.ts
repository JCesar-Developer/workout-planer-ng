import { Component } from '@angular/core';
import { MenuItem } from './menuItem.interface';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {

  public menuItems: MenuItem[] = [
    { title: 'Estadísticas', link: '/statistics' },
    { title: 'Registros', link: '/registers' },
    { title: 'Workouts', link: '/workouts' },
    { title: 'Ejercicios', link: '/exercises' },
  ]

}
