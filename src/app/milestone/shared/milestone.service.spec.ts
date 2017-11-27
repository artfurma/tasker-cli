/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MilestoneService } from './milestone.service';

describe('Service: Milestone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilestoneService]
    });
  });

  it('should ...', inject([MilestoneService], (service: MilestoneService) => {
    expect(service).toBeTruthy();
  }));
});