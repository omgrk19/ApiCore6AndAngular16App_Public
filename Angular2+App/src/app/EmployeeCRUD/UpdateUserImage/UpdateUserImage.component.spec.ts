import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserImageComponent } from './UpdateUserImage.component';

describe('EditComponent', () => {
  let component: UpdateUserImageComponent;
  let fixture: ComponentFixture<UpdateUserImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserImageComponent]
    });
    fixture = TestBed.createComponent(UpdateUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
