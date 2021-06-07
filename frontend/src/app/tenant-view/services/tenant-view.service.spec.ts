import { TestBed } from '@angular/core/testing';

import { TenantViewService } from './tenant-view.service';

describe('TenantViewService', () => {
  let service: TenantViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
