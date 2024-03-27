import { TestBed } from '@angular/core/testing';

import { SessaoDataTransferService } from './sessao-data-transfer.service';

describe('SessaoDataTransferService', () => {
  let service: SessaoDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessaoDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
