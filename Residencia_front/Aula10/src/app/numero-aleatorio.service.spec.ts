import { TestBed } from '@angular/core/testing';

import { NumeroAleatorioService } from './numero-aleatorio.service';

describe('NumeroAleatorioService', () => {
  let service: NumeroAleatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeroAleatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
