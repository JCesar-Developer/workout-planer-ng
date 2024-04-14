import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExercisePageHeaderComponent } from "./exercise-page-header.component";
import { ButtonModule } from "primeng/button";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonModule } from "@angular/common";
import { AutoCompleteModule } from "primeng/autocomplete";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  selector: 'exercise-searchbar',
  template: ''
})
class ExerciseSearchbarComponentStub {}

@Component({
  selector: 'exercise-filter-tabs',
  template: ''
})
class ExerciseFilterTabsComponentStub {}

describe("ExercisePageHeaderComponent", () => {

  let component: ExercisePageHeaderComponent;
  let fixture: ComponentFixture<ExercisePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExercisePageHeaderComponent,
        ExerciseSearchbarComponentStub,
        ExerciseFilterTabsComponentStub,
      ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ButtonModule,
        AutoCompleteModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePageHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render 'Title goes here' if no title is passed", () => {
    expect(component.title).toBe('Title goes here');
  });

  it("should render the title passed", () => {
    const title = 'New title';
    component.title = title;
    expect(component.title).toBe(title);
  });

  it("should render ExerciseSearchbarComponent", () => {
    const element = fixture.debugElement.query(By.directive(ExerciseSearchbarComponentStub));
    expect(element).not.toBeNull();
  });

  it('should render ExerciseFilterTabsComponent', () => {
    const element = fixture.debugElement.query(By.directive(ExerciseFilterTabsComponentStub));
    expect(element).not.toBeNull();
  });

  it('should call openForm when p-button is clicked', () => {
    const openFormSpy = spyOn(component, 'onOpenForm');

    const pButton = fixture.debugElement.query(By.css('p-button'));
    pButton.triggerEventHandler('click');

    expect(openFormSpy).toHaveBeenCalled();

    openFormSpy.calls.reset();
  });

  it('should emit an event with undefined value when openForm is called', () => {
    const emitSpy = spyOn(component.openCreateForm, 'emit');

    component.onOpenExerciseForm();

    expect(emitSpy).toHaveBeenCalledWith();

    emitSpy.calls.reset();
  });

  it('should emit an event when p-button is clicked', () => {
    const emitSpy = spyOn(component.openCreateForm, 'emit');

    const pButton = fixture.debugElement.query(By.css('p-button'));
    pButton.triggerEventHandler('click');

    expect(emitSpy).toHaveBeenCalled();

    emitSpy.calls.reset();
  });

});
