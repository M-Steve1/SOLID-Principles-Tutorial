import { TestBed } from '@angular/core/testing';

import { UserCommandService } from './user-command.service';

describe('UserCommandService', () => {
  let service: UserCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
