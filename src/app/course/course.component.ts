import { Component, inject, signal } from '@angular/core';
import { Course } from '../_models/course';
import { Lesson } from '../_models/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  onDeleteLesson(_t7: Lesson) {
    throw new Error('Method not implemented.');
  }
  onEditLesson(_t7: Lesson) {
    throw new Error('Method not implemented.');
  }

  course = signal<Course | null>(null);
  lessons = signal<Lesson[]>([]);


  route = inject(ActivatedRoute)

  ngOnInit() {
    this.course.set(this.route.snapshot.data["course"]);
    const lessons = this.route.snapshot.data["lessons"];
    this.lessons.set(lessons);

  }



}
