import { Course } from "../course/course.interface";

export interface OfficeHours {
  key?: string;
  course: Course;
  instructors: string[];
  studentQueue: string[];
  location: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  instructing: boolean;
}
