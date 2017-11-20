/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskFiltersService } from './task-filters.service';

describe('Service: TaskFilters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskFiltersService]
    });
  });

  it('should ...', inject([TaskFiltersService], (service: TaskFiltersService) => {
    expect(service).toBeTruthy();
  }));
});