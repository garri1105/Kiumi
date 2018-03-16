import {Profile} from "../profile/profile.interface";

export interface Instructor extends Profile {
  courses: string[];
  officeHours: string[];
}
