import { TestBed } from '@angular/core/testing';

import { HistoricoPreciosService } from './historico-precios.service';

describe('HistoricoPreciosService', () => {
  let service: HistoricoPreciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoPreciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
