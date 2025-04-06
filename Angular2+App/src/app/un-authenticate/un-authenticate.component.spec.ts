import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthenticateComponent } from './un-authenticate.component';

describe('UnAuthenticateComponent', () => {
  let component: UnAuthenticateComponent;
  let fixture: ComponentFixture<UnAuthenticateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnAuthenticateComponent]
    });
    fixture = TestBed.createComponent(UnAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
