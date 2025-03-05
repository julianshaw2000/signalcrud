import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseLessonsResolver } from '../_services/course-lessons.resolver';

describe('courseLessonsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => courseLessonsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
