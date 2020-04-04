import { TestBed } from '@angular/core/testing';

import { MapboxStaticApiService } from './mapbox-static-api.service';

describe('MapboxStaticApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapboxStaticApiService = TestBed.get(MapboxStaticApiService);
    expect(service).toBeTruthy();
  });
});
