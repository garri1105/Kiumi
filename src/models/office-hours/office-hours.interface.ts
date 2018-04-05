import { Profile } from "../profile/profile.interface";

export interface OfficeHours {
  key?: string;
  instructors: string[];
  studentQueue: string[];
  location: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  instructing: boolean;
}
