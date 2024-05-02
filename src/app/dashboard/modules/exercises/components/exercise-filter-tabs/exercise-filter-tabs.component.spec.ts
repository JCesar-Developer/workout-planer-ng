import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseFilterTabsComponent } from './exercise-filter-tabs.component';
import { ExerciseStoreService } from '@dashboard/shared/services/exercise-store-actions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChipModule } from 'primeng/chip';

describe('ExerciseFilterTabsComponent', () => {

  let fixture: ComponentFixture<ExerciseFilterTabsComponent>;
  let component: ExerciseFilterTabsComponent;
  let exerciseStoreService: ExerciseStoreService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseFilterTabsComponent ],
      imports: [ HttpClientTestingModule, ChipModule ],
      providers: [ ExerciseStoreService ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFilterTabsComponent);
    component = fixture.componentInstance;
    exerciseStoreService = TestBed.inject(ExerciseStoreService);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories from exercise store service', () => {
    const categories = exerciseStoreService.getExerciseCategories();
    spyOn(exerciseStoreService, 'getExerciseCategories').and.returnValue(categories);

    expect(component.categories).toEqual(categories);

    (exerciseStoreService.getExerciseCategories as jasmine.Spy).and.callThrough();
  });

  it('should render categories in the view', () => {
    const categories = exerciseStoreService.getExerciseCategories();
    spyOn(exerciseStoreService, 'getExerciseCategories').and.returnValue(categories);

    const tabs = compiled.querySelectorAll('.p-chip');
    expect(tabs.length).toBe(categories.length);
    tabs.forEach((tab, index) => {
      expect(tab.textContent).toContain(categories[index]);
    });

    (exerciseStoreService.getExerciseCategories as jasmine.Spy).and.callThrough();
  });

  it('should dispatch onFilterByCategory method after click on filter button', () => {
    const filterSpy = spyOn(component, 'onFilterByCategory');

    const tabs = compiled.querySelectorAll('[data-testId="filter-tab"]');
    tabs.forEach(tab => {
      (tab as HTMLElement).click();
      expect(filterSpy).toHaveBeenCalled();
    });

    filterSpy.calls.reset();
  });

  it('should call onFilterByCategory method of ExerciseStoreService with argument of clicked button', () => {
    const filterSpy = spyOn(exerciseStoreService, 'filterExercisesByCategory');

    const indexCategorySelected: number = 0;
    const tab: HTMLElement = compiled.querySelectorAll('[data-testId="filter-tab"]')[indexCategorySelected] as HTMLElement;
    tab.click();

    expect(filterSpy).toHaveBeenCalledWith(component.categories[indexCategorySelected]);

    filterSpy.calls.reset();
  });

});
