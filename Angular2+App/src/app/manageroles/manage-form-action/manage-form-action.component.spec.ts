import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFormActionComponent } from './manage-form-action.component';

describe('ManageFormActionComponent', () => {
  let component: ManageFormActionComponent;
  let fixture: ComponentFixture<ManageFormActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFormActionComponent]
    });
    fixture = TestBed.createComponent(ManageFormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
