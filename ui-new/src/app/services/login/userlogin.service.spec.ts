import { TestBed, inject } from '@angular/core/testing';

import { UserloginService } from './userlogin.service';

describe('UserloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserloginService]
    });
  });

  it('should be created', inject([UserloginService], (service: UserloginService) => {
    expect(service).toBeTruthy();
  }));
});
