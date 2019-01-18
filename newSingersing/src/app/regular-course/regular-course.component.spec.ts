import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCourseComponent } from './regular-course.component';

describe('RegularCourseComponent', () => {
  let component: RegularCourseComponent;
  let fixture: ComponentFixture<RegularCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
