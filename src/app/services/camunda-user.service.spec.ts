import { TestBed } from '@angular/core/testing';

import { CamundaUserService } from "./CamundaUserService";

describe('CamundaUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamundaUserService = TestBed.get(CamundaUserService);
    expect(service).toBeTruthy();
  });
});
