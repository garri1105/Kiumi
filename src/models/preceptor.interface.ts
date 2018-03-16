export interface Preceptor {
    key?: string;
    name: string;
    studentId: number;
    email: string;
    courses?: string[];
    coursesPrecepting: string[];
  }
  