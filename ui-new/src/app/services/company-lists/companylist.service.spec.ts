import { TestBed, inject } from '@angular/core/testing';

import { CompanylistService } from './companylist.service';

describe('CompanylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanylistService]
    });
  });

  it('should be created', inject([CompanylistService], (service: CompanylistService) => {
    expect(service).toBeTruthy();
  }));
});
