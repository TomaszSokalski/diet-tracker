import { TestBed } from '@angular/core/testing';

import { CalculateCaloriesService } from './calculate-calories.service';

describe('CalculateCaloriesService', () => {
  let service: CalculateCaloriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateCaloriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
