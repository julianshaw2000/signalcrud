import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Lesson } from '../_models/lesson.model';
import { LessonsService } from '../_services/lessons.service';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@Component({
  selector: 'app-lessons',
  imports: [LessonDetailComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  mode = signal<'master' | 'detail'>('master');

  lessons = signal<Lesson[]>([]);
  selectedLesson = signal<Lesson | null>(null);
  lessonsService = inject(LessonsService)

  searchInput = viewChild.required<ElementRef>('search');

  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    const results = await this.lessonsService.loadLessons({ query });
    this.lessons.set(results);
  }

  onLessonSelected(_t10: Lesson) {
    throw new Error('Method not implemented.');
  }

}
