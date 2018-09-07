import { TestBed, inject } from '@angular/core/testing';

import { LanderpageService } from './landerpage.service';

describe('LanderpageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanderpageService]
    });
  });

  it('should be created', inject([LanderpageService], (service: LanderpageService) => {
    expect(service).toBeTruthy();
  }));
});
