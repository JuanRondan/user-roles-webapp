import { TestBed } from '@angular/core/testing';

import { ConfirmationAlertService } from './confirmation-alert.service';

describe('ConfirmationAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationAlertService = TestBed.get(ConfirmationAlertService);
    expect(service).toBeTruthy();
  });
});
