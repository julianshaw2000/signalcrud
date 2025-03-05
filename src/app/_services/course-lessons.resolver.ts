import { ResolveFn } from '@angular/router';
import { LessonsService } from './lessons.service';
import { Lesson } from '../_models/lesson.model';

export const courseLessonsResolver: ResolveFn<Lesson[]> = (route, state) => {

  const courseId = route.paramMap.get("courseId");

  if (!courseId) {
    return [];
  }

  const lessonsService = new LessonsService();
  return lessonsService.loadLessons({ courseId });

};
