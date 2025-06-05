import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserProfileFormActionComponent } from './manage-user-profile-form-action.component';

describe('ManageUserProfileFormActionComponent', () => {
  let component: ManageUserProfileFormActionComponent;
  let fixture: ComponentFixture<ManageUserProfileFormActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserProfileFormActionComponent]
    });
    fixture = TestBed.createComponent(ManageUserProfileFormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
