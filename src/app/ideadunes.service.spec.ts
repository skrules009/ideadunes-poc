import { TestBed } from '@angular/core/testing';

import { IdeadunesService } from './ideadunes.service';

describe('IdeadunesService', () => {
  let service: IdeadunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeadunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
