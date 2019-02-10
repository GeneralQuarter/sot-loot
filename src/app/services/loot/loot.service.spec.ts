import { TestBed } from '@angular/core/testing';

import { LootService } from './loot.service';

describe('LootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LootService = TestBed.get(LootService);
    expect(service).toBeTruthy();
  });
});
