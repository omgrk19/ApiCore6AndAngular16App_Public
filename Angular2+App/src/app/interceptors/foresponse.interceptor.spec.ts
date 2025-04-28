import { TestBed } from '@angular/core/testing';

import { ForesponseInterceptor } from './foresponse.interceptor';

describe('ForesponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ForesponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ForesponseInterceptor = TestBed.inject(ForesponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
