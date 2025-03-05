import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LessonsComponent } from "./lessons/lessons.component";
// import { isUserAuthenticated } from "./guards/auth.guard";
import { CourseComponent } from "./course/course.component";
import { courseResolver } from "./_services/course.resolver";
import { courseLessonsResolver } from "./_services/course-lessons.resolver";
// import { LinkedSignalDemoComponent } from "./linked-signal/linked-signal-demo.component";
import { ResourceDemoComponent } from "./resource-demo/resource-demo.component";
import { isUserAuthenticated } from './_services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticated]
  },
  {
    'path': 'courses/:courseId',
    component: CourseComponent,
    canActivate: [isUserAuthenticated],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  // {
  //   path: "shopping-cart",
  //   component: LinkedSignalDemoComponent
  // },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
