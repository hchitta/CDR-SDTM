import { TestBed, inject } from '@angular/core/testing';

import { CheckconfigService } from './checkconfig.service';

describe('CheckconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckconfigService]
    });
  });

  it('should be created', inject([CheckconfigService], (service: CheckconfigService) => {
    expect(service).toBeTruthy();
  }));
});
