
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course, sortCoursesBySeqNo } from '../_models/course';
import { CoursesService } from '../_services/courses.service';
import { MaterialModule } from '../_shared/material.module';
import { CourseCardListComponent } from '../course-card-list/course-card-list.component';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MaterialModule, CourseCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  #courses = signal<Course[]>([]);

  courseService = inject(CoursesService);
  messagesService = inject(MessagesService);

  dialog = inject(MatDialog);

  beginCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER');
  })

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED');
  })

  // messageService = inject(MessagesService);

  constructor() {

    effect(() => {
      console.log('Begin Courses ', this.beginCourses());
      console.log('Advanced Courses ', this.advancedCourses());
    }
    );
    this.loadCourses()
      .then(() => {
        console.log('Courses loaded');
      });
  }

  async onAddCourse() {

    const newcourse = await openEditCourseDialog(this.dialog, {
      mode: 'create', title: 'Create Course'
    });

    const courses = this.#courses();
    const newCourses = [...courses, newcourse];
    this.#courses.set(newCourses);

  }

  onCourseUpdated(course: Course) {
    const courses = this.#courses();
    const newCourses = courses.map(c => c.id === course.id ? course : c);
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {

      await this.courseService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter(c => c.id !== courseId);
      this.#courses.set(newCourses);

    } catch (error) {
      console.error('Failed to delete course', error);
      alert('Failed to delete course');
    }

  }

  async loadCourses() {
    try {
      const courses = await this.courseService.loadCoursesHttp();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (error) {
      this.messagesService.showMessage('Failed to load courses', 'error');
      // console.error('Failed to load courses', error);
    }
  }
}
