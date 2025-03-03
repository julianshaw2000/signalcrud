import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditCourseDialogData } from '../_models/editcourse-dialog-data';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../_models/course';
import { CoursesService } from '../_services/courses.service';

@Component({
  selector: 'app-edit-course-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogef = inject(MatDialogRef)

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder)

  form = this.fb.group({
    title: [this.data?.course?.title || ''],
    longDescription: [this.data?.course?.longDescription || ''],
    category: [this.data?.course?.category || ''],
    iconUrl: [this.data?.course?.iconUrl || '']
  })

  courseService = inject(CoursesService)

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl
    })
  }

  onClose() {
    this.dialogef.close({ title: "" })
  }

  async onSave() {
    const courseProps =
      this.form.value as Partial<Course>

    // console.log('Course id', this.data?.course!.id)
    console.log('Course props', courseProps)

    if (this.data?.mode === 'update') {
      this.saveCourse(
        this.data?.course!.id,
        courseProps
      )
    }
    else if (this.data?.mode === 'create') {
      this.createCourse(courseProps)
    }

  }
  async createCourse(courseProps: Partial<Course>) {
    try {
      const newCourse = await this.courseService.createCourse(courseProps)
      this.dialogef.close(newCourse)

    }
    catch (error) {
      console.error(error)
      alert('Failed to create course')

    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.courseService.saveCourse(
        courseId, changes
      )

      this.dialogef.close(updatedCourse)

    } catch (err) {
      console.error(err)
      alert('Failed to save course')
    }

  }

}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(
    EditCourseDialogComponent, config)
    .afterClosed();

  return firstValueFrom(close$);


}
