import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDocComponent } from './UpdateUserDoc.component';

describe('EditComponent', () => {
  let component: UpdateUserDocComponent;
  let fixture: ComponentFixture<UpdateUserDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserDocComponent]
    });
    fixture = TestBed.createComponent(UpdateUserDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
