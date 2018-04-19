import {Profile} from "../profile/profile.interface";

export interface OfficeHours {
  key?: string;
  instructors: string[];
  studentQueue: string[];
  location: string;
  date: string;
  duration: number;

  // Only used locally. Not added to database
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  instructing: boolean;
  error?: string;
  instructorsO: Profile[];
}
