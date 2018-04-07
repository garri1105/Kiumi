export interface OfficeHours {
  key?: string;
  instructors: string[];
  studentQueue: string[];
  location: string;
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  instructing: boolean;
}
