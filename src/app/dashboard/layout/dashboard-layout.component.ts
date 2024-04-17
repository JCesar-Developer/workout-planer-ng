import { Component, OnInit } from '@angular/core';
import { ExerciseHttpService } from '@dashboard/shared/services/http-services/exercise-http.service';
import { ExerciseStoreService } from '@dashboard/shared/services/store-services/exercise-store.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styles: [
  ]
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private exerciseStore: ExerciseStoreService,
    private exerciseHttp: ExerciseHttpService,
  ) { }

  ngOnInit(): void {
    this.initializeExerciseStore();
  }

  private initializeExerciseStore(): void {
    if( this.exerciseStore.allExercises.length === 0 ) {
      this.exerciseHttp.getAll()
        .subscribe( exercises => {
          this.exerciseStore.initializeStore( exercises );
        });
    }
  }

}
