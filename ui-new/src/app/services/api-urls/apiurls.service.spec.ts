import { TestBed, inject } from '@angular/core/testing';

import { ApiurlsService } from './apiurls.service';

describe('ApiurlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiurlsService]
    });
  });

  it('should be created', inject([ApiurlsService], (service: ApiurlsService) => {
    expect(service).toBeTruthy();
  }));
});
