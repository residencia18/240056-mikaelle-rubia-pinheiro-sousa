import { TestBed } from '@angular/core/testing';

import { HistoricoPesoService } from './historico-peso.service';

describe('HistoricoPesoService', () => {
  let service: HistoricoPesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoPesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
