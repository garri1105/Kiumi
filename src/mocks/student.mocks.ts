import {Student} from "../models/student.interface";

const studentList: Student[] = [
  {
    name: 'Juan David',
    studentId: 101068610,
    email: 'jgarrido@macalester.edu',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMFzwauC-Exmi4oFv', '-L6mMFzzl-JLuEL-4tLG', '-L6mMG-2h_oLWXDdjRfs']
  },
  {
    name: 'Salman',
    studentId: 101456789,
    email: 'sahmed@macalester.edu',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMFzwauC-Exmi4oFv']
  },
  {
    name: 'Raza',
    studentId: 101212345,
    email: 'rkhalid@macalester.edu',
    courses: ['-L6mMFzzl-JLuEL-4tLG', '-L6mMG-2h_oLWXDdjRfs']
  },
  {
    name: 'David',
    studentId: 101432230,
    email: 'jgarrido@macalester.edu',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMG-2h_oLWXDdjRfs']
  },
];

export const STUDENT_QUEUE = studentList;
