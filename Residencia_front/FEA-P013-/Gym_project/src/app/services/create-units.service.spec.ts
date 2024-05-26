import { TestBed } from '@angular/core/testing';

import { CreateUnitsService } from './create-units.service';

describe('CreateUnitsService', () => {
  let service: CreateUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
