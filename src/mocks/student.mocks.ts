import {Student} from "../models/student.interface";

const studentList: Student[] = [
  {
    name: 'Juan David',
    studentId: 101068610,
    email: 'jgarrido@macalester.edu'
  },
  {
    name: 'Salman',
    studentId: 101456789,
    email: 'sahmed@macalester.edu'
  },
  {
    name: 'Raza',
    studentId: 101212345,
    email: 'rkhalid@macalester.edu'
  },
  {
    name: 'David',
    studentId: 101432230,
    email: 'jgarrido@macalester.edu'
  },
];

export const STUDENT_QUEUE = studentList;
