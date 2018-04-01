import { Course } from "../course/course.interface";
import { Profile } from "../profile/profile.interface";


export interface OfficeHours {
  course: Course;
  instructors: string[];
  studentQueue: Profile[];
  location: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
}
