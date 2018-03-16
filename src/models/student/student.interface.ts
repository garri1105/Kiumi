import {Profile} from "../profile/profile.interface";

export interface Student extends Profile {
  courses: string[];
}
