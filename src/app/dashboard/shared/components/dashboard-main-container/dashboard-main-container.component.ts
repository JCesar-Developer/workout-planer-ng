import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-main-container',
  templateUrl: './dashboard-main-container.component.html',
})
export class DashboardMainContainerComponent {

  @Input() title: string = 'Title goes here';

}
