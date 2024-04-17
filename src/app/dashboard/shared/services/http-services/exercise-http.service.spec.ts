import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ExerciseHttpService } from "../http-services/exercise-http.service";
import { type Exercise, Category } from "@dashboard/shared/interfaces/exercise.interface";

describe("ExerciseHttpService", () => {

  let exerciseService: ExerciseHttpService;
  let httpMock: HttpTestingController;
  const exercise1: Exercise = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };
  const exercise2: Exercise = { id: '2', name: 'Exercise 2', category: Category.LEGS, image: './assets/images/exercises/exercise-2.gif' };
  const exercise3: Exercise = { id: '3', name: 'Exercise 3', category: Category.CORE, image: './assets/images/exercises/exercise-3.gif' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ExerciseHttpService ]
    })
  });

  beforeEach(() => {
    exerciseService = TestBed.inject(ExerciseHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(exerciseService).toBeTruthy();
  });

  it("should get all exercises", () => {
    const mockExercises: Exercise[] = [exercise1, exercise2, exercise3];

    exerciseService.getAll().subscribe(exercises => {
      expect(exercises.length).toBe(3);
      expect(exercises).toEqual(mockExercises);
    });

    const request = httpMock.expectOne(`${exerciseService.baseUrl}/exercises`);
    expect(request.request.method).toBe("GET");
    request.flush(mockExercises);
  });

  it("should save an exercise", () => {
    const mockExercise: Exercise = exercise1;

    exerciseService.save(mockExercise).subscribe(exercise => {
      expect(exercise).toEqual(mockExercise);
    });

    const request = httpMock.expectOne(`${exerciseService.baseUrl}/exercises`);
    expect(request.request.method).toBe("POST");
    expect(request.request.body).toEqual(mockExercise);
    request.flush(mockExercise);
  });

  it("should update an exercise", () => {
    const mockExercise: Exercise = exercise1;

    exerciseService.update(mockExercise).subscribe(exercise => {
      expect(exercise).toEqual(mockExercise);
    });

    const request = httpMock.expectOne(`${exerciseService.baseUrl}/exercises/${mockExercise.id}`);
    expect(request.request.method).toBe("PUT");
    expect(request.request.body).toEqual(mockExercise);
    request.flush(mockExercise);
  });

  it("should delete an exercise", () => {
    const mockExercise: Exercise = exercise1;

    exerciseService.delete(mockExercise.id).subscribe(exercise => {
      expect(exercise).toEqual(mockExercise);
    });

    const request = httpMock.expectOne(`${exerciseService.baseUrl}/exercises/${mockExercise.id}`);
    expect(request.request.method).toBe("DELETE");
    request.flush(mockExercise);
  });

});
