import {Student} from "../student/student.interface";
import {Instructor} from "../instructor/instructor.interface";

export interface Profile {
  key?: string;
  name: string;
  avatarURL?: string;
  student?: Student;
  instructor?: Instructor;
}
