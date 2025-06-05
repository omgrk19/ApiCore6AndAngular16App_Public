import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileFormActionComponent } from './manage-profile-form-action.component';

describe('ManageProfileFormActionComponent', () => {
  let component: ManageProfileFormActionComponent;
  let fixture: ComponentFixture<ManageProfileFormActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProfileFormActionComponent]
    });
    fixture = TestBed.createComponent(ManageProfileFormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
