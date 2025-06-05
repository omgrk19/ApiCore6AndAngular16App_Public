import { TestBed } from '@angular/core/testing';

import { ApiBaseUrlService } from './api-base-url.service';

describe('ApiBaseUrlService', () => {
  let service: ApiBaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
