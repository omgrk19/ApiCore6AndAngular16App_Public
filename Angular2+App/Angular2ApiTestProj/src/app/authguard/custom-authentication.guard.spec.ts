import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customAuthenticationGuard } from './custom-authentication.guard';

describe('customAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
