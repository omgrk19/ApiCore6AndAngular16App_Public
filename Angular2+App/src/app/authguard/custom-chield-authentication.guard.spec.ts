import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { customChieldAuthenticationGuard } from './custom-chield-authentication.guard';

describe('customChieldAuthenticationGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customChieldAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
