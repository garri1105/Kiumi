import {Student} from "../models/student/student.interface";

const studentList: Student[] = [
  {
    name: 'Juan David',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMFzwauC-Exmi4oFv', '-L6mMFzzl-JLuEL-4tLG', '-L6mMG-2h_oLWXDdjRfs']
  },
  {
    name: 'Salman',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMFzwauC-Exmi4oFv']
  },
  {
    name: 'Raza',
    courses: ['-L6mMFzzl-JLuEL-4tLG', '-L6mMG-2h_oLWXDdjRfs']
  },
  {
    name: 'David',
    courses: ['-L6mMFzpDy8uZqOdi6aF', '-L6mMG-2h_oLWXDdjRfs']
  },
];

export const STUDENT_QUEUE = studentList;
