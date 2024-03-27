import { TestBed } from '@angular/core/testing';

import { SuinoDataTransferService } from './suino-data-transfer.service';

describe('SuinoDataTransferService', () => {
  let service: SuinoDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuinoDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
