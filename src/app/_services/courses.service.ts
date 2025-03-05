import { inject, Injectable } from '@angular/core';
import { Course } from '../_models/course';
import { environment } from '../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { GetCourseResponse } from '../_models/getCourseResponse';
import { firstValueFrom } from 'rxjs';
import { SkipLoading } from './skipLoading';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  env = environment
  http = inject(HttpClient)

  async loadAllCoursesFetch(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`
    ) // GET /api/courses
    const payload = await response.json()
    return payload.courses
  }

  async loadCoursesHttp(): Promise<Course[]> {
    const courses$ =
      this.http.get<GetCourseResponse>(`${this.env.apiRoot}/courses`,
        {
          context: new HttpContext().set(SkipLoading, true)
        })
    const response = await firstValueFrom(courses$)
    return response.courses

  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ =
      await this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return await firstValueFrom(course$)
  }

  async saveCourse(courseId: string, course: Partial<Course>): Promise<Course> {
    const course$ =
      await this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, course)
    return await firstValueFrom(course$)
  }

  async deleteCourse(courseId: string): Promise<void> {
    await this.http.delete(`${this.env.apiRoot}/courses/${courseId}`)
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$ =
      this.http.get<Course>(`${this.env.apiRoot}/courses/${courseId}`)
    const course = await firstValueFrom(course$)
    // console.log('Course from service >>', course)
    return course
  }


}
