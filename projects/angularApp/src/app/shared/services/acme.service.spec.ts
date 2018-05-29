import { TestBed, inject } from '@angular/core/testing';

import { AcmeService } from './acme.service';

describe('AcmeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcmeService]
    });
  });

  it('should be created', inject([AcmeService], (service: AcmeService) => {
    expect(service).toBeTruthy();
  }));
});
