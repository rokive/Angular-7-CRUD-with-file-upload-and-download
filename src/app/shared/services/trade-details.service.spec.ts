import { TestBed } from '@angular/core/testing';

import { TradeDetailsService } from './trade-details.service';

describe('TradeDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradeDetailsService = TestBed.get(TradeDetailsService);
    expect(service).toBeTruthy();
  });
});
