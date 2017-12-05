/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersFiltersService } from './users-filters.service';

describe('Service: UsersFilters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersFiltersService]
    });
  });

  it('should ...', inject([UsersFiltersService], (service: UsersFiltersService) => {
    expect(service).toBeTruthy();
  }));
});