import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lesson } from '../_models/lesson.model';
import { firstValueFrom } from 'rxjs';
import { GetLessonsResponse } from '../_models/getLessonsResponse';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment

  http = inject(HttpClient)

  async loadLessons(config: { courseId?: string, query?: string }): Promise<Lesson[]> {

    console.log('course id  >>>>', config.courseId)
    const { courseId, query } = config

    let params = new HttpParams()

    if (courseId) {
      params = params.set('courseId', courseId)
    }

    if (query) {
      params = params.set('query', query)
    }

    // const lessons$ =
    //   this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/courses/${courseId}/lessons`)

    // http://localhost:9000/api/search-lessons?courseId=18

    const lessons$ = this.http.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`,
      {
        params
      }
    )



    const response = await firstValueFrom(lessons$)
    return response.lessons;

    // return []
  }
}
