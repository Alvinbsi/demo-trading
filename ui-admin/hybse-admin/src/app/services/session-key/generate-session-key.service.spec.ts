import { TestBed, inject } from '@angular/core/testing';

import { GenerateSessionKeyService } from './generate-session-key.service';

describe('GenerateSessionKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateSessionKeyService]
    });
  });

  it('should be created', inject([GenerateSessionKeyService], (service: GenerateSessionKeyService) => {
    expect(service).toBeTruthy();
  }));
});
