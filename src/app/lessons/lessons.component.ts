import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Lesson } from '../_models/lesson.model';
import { LessonsService } from '../_services/lessons.service';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
  imports: [LessonDetailComponent]
})
export class LessonsComponent {
  mode = signal<'master' | 'detail'>('master');

  lessons = signal<Lesson[]>([]);
  selectedLesson = signal<Lesson | null>(null);
  lessonsService = inject(LessonsService)

  searchInput = viewChild.required<ElementRef>('search');

  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;

    if (query.length < 3) return;
    const results = await this.lessonsService.loadLessons({ query });
    this.lessons.set(results);
  }



  onLessonSelected(lesson: Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }




  onCancel() {
    this.mode.set("master");
  }

  onLessonUpdated(lesson: Lesson) {
    this.lessons.update(lessons =>
      lessons.map(l => l.id === lesson.id ? lesson : l)
    );

  }
}
