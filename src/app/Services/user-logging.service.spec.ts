import { TestBed } from '@angular/core/testing';

import { UserLoggingService } from './user-logging.service';

describe('UserLoggingService', () => {
  let service: UserLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
