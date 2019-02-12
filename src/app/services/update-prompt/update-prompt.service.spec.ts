import { TestBed } from '@angular/core/testing';

import { UpdatePromptService } from './update-prompt.service';

describe('UpdatePromptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePromptService = TestBed.get(UpdatePromptService);
    expect(service).toBeTruthy();
  });
});
