import { Course } from "./course"

export type EditCourseDialogData = {
  mode: 'create' | 'update',
  title: string,
  course?: Course

}
