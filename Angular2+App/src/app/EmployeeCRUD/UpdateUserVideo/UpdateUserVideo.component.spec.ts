import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserVideoComponent } from './UpdateUserVideo.component';

describe('EditComponent', () => {
  let component: UpdateUserVideoComponent;
  let fixture: ComponentFixture<UpdateUserVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserVideoComponent]
    });
    fixture = TestBed.createComponent(UpdateUserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
