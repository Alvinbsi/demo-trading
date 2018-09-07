import { TestBed, inject } from '@angular/core/testing';

import { ServiceUtilsService } from './service-utils.service';

describe('ServiceUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceUtilsService]
    });
  });

  it('should be created', inject([ServiceUtilsService], (service: ServiceUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
