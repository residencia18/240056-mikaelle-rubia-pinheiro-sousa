import { TestBed } from '@angular/core/testing';

import { LogandoServiceService } from './logando-service.service';

describe('LogandoServiceService', () => {
  let service: LogandoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogandoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
