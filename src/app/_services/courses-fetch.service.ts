import { inject, Injectable } from '@angular/core';
import { Course } from '../_models/course';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetCourseResponse } from '../_models/getCourseResponse';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  env = environment
  http = inject(HttpClient)

  async loadAllCoursesFetch(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`) // GET /api/courses
    const payload = await response.json()
    return payload.courses
  }

  async loadCoursesHttp(): Promise<Course[]> {
    const courses$ =
      this.http.get<GetCourseResponse>(`${this.env.apiRoot}/courses`)

    const response = await firstValueFrom(courses$)
    return response.courses

  }
}
