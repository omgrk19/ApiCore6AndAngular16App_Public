import { TestBed } from '@angular/core/testing';

import { ProfileToHomeService } from './profile-to-home.service';

describe('ProfileToHomeService', () => {
  let service: ProfileToHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileToHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
