import { Component, inject, input, output } from '@angular/core';
import { Course } from '../_models/course';
import { MaterialModule } from '../_shared/material.module';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-card-list',
  imports: [
    MaterialModule, RouterModule
  ],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export class CourseCardListComponent {

  courses = input.required<Course[]>()

  courseUpdated = output<Course>()
  courseDeleted = output<string>()

  dialog = inject(MatDialog)

  async onEditCourse(course: Course) {
    console.log('Edit course', course)
    const newCourse: Course = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Edit Course',
      course
    })

    if (!newCourse) {
      return
    }

    console.log('New course', newCourse)

    this.courseUpdated.emit(newCourse)
  }

  onDeleteCourse(course: Course) {
    console.log('Delete course', course)
    this.courseDeleted.emit(course.id)
  }

}
