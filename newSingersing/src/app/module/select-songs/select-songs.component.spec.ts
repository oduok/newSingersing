import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSongsComponent } from './select-songs.component';

describe('SelectSongsComponent', () => {
  let component: SelectSongsComponent;
  let fixture: ComponentFixture<SelectSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
