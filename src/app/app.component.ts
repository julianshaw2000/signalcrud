import { Component, computed, effect, inject, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Course, sortCoursesBySeqNo } from './_models/course';
import { CoursesService } from './_services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MaterialModule } from './_shared/material.module';
import { MatDialog } from '@angular/material/dialog';

import { openEditCourseDialog } from './edit-course-dialog/edit-course-dialog.component';
import { LoadingIndicatorComponent } from './loading/loading.component';
import { MessagesComponent } from "./_shared/messages/messages.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { AuthService } from './_services/auth.service';
import { MessagesService } from './_services/messages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoadingIndicatorComponent,
    MaterialModule, RouterLink,
    MatSidenavModule, MatNavList, MatListModule,
    RouterOutlet, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  authService = inject(AuthService);
  messagesService = inject(MessagesService);

  isLoggedIn = this.authService.isLoggedIn;




  #courses = signal<Course[]>([]);

  courseService = inject(CoursesService);

  dialog = inject(MatDialog);

  beginCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER');
  })

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED');
  })


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

  onLogout() {
    this.authService.logout();
  }

  async onAddCourse() {

    const newcourse = await openEditCourseDialog(this.dialog, {
      mode: 'create', title: 'Create Course'
    });

    if (!newcourse) {
      return;
    }

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
      console.error('Failed to load courses', error);
    }
  }
}
