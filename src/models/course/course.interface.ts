import { OfficeHours } from "../office-hours/office-hours.interface";

export interface Course {
  key?: string;
  number: string;
  title: string;
  students: string[];
  instructors: string[];
  officeHours: OfficeHours[];

  // Only used locally. Not added to database
  selection: string;
}
