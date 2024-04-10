import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExercisePageListComponent } from "./exercise-page-list.component";
import { ExerciseStoreService } from "@dashboard/shared/services/exercise-store.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { Category } from "@dashboard/shared/interfaces/exercise.interface";

describe("ExercisePageListComponent", () => {

  let fixture: ComponentFixture<ExercisePageListComponent>;
  let component: ExercisePageListComponent;
  let exerciseStoreService: ExerciseStoreService;

  const exercise1 = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };
  const exercise2 = { id: '2', name: 'Exercise 2', category: Category.LEGS, image: './assets/images/exercises/exercise-2.gif' };
  const exercise3 = { id: '3', name: 'Exercise 3', category: Category.CORE, image: './assets/images/exercises/exercise-3.gif' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExercisePageListComponent,
      ],
      providers: [
        ExerciseStoreService,
      ],
      imports: [
        HttpClientTestingModule,
        CommonModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePageListComponent);
    exerciseStoreService = TestBed.inject(ExerciseStoreService);
    component = new ExercisePageListComponent(exerciseStoreService);
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll method from exerciseStoreService', () => {
    const getAllSpy = spyOn(exerciseStoreService, 'getAll').and.returnValue(of([]));
    component = new ExercisePageListComponent(exerciseStoreService);

    expect(getAllSpy).toHaveBeenCalled();
  });



  // it("should call openExerciseForm", () => {
  //   const exercise = { id: 1, name: "Exercise 1" };
  //   const emitSpy = spyOn(component.openEditForm, "emit");

  //   component.openExerciseForm(exercise);

  //   expect(emitSpy).toHaveBeenCalledWith(exercise);
  // });

  // it("should call ngOnDestroy", () => {
  //   const unsubscribeSpy = spyOn(component.$exercises, "unsubscribe");

  //   component.ngOnDestroy();

  //   expect(unsubscribeSpy).toHaveBeenCalled();
  // });

})
