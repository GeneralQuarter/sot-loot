import { TestBed } from '@angular/core/testing';

import { LootHistoryService } from './loot-history.service';

describe('LootHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LootHistoryService = TestBed.get(LootHistoryService);
    expect(service).toBeTruthy();
  });
});
