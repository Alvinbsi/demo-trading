import { TestBed, inject } from '@angular/core/testing';

import { SocialRegisterationService } from './social-registeration.service';

describe('SocialRegisterationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialRegisterationService]
    });
  });

  it('should be created', inject([SocialRegisterationService], (service: SocialRegisterationService) => {
    expect(service).toBeTruthy();
  }));
});
