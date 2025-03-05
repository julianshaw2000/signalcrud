import { ResolveFn } from '@angular/router';
import { Course } from '../_models/course';
import { CoursesService } from './courses.service';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Course | null> = async (route, state) => {

  const courseId = route.paramMap.get("courseId");

  if (!courseId) {
    return null;
  }

  const courseServices = inject(CoursesService);

  console.log('Course id >>', courseId);
  const course: Course = await courseServices.getCourseById(courseId);
  console.log('Course resolver >>', course);
  return course;
};
