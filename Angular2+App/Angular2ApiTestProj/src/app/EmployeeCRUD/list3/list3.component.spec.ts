import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List3Component } from './list3.component';

describe('ListComponent', () => {
  let component: List3Component;
  let fixture: ComponentFixture<List3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [List3Component]
    });
    fixture = TestBed.createComponent(List3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
