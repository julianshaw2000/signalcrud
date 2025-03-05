import { ResolveFn } from '@angular/router';
import { Lesson } from '../_models/lesson.model';
import { LessonsService } from './lessons.service';

export const lessonsResolver: ResolveFn<Lesson[]> = (route, state) => {

  const courseId = route.paramMap.get("courseId");
  if (!courseId) {
    return [];
  }

  const lessonsService = new LessonsService();
  return lessonsService.loadLessons({ courseId });

};
