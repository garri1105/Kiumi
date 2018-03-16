import {Course} from "../models/course/course.interface";

const courseList: Course[] = [
  {
    number: 'Comp225',
    title: 'Software Design',
    students: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v', '-L6mKXkYvRO1D8dOoqxX'],
    officeHours: []
  },
  {
    number: 'Math236',
    title: 'Linear Algebra',
    students: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v'],
    officeHours: []
  },
  {
    number: 'Comp221',
    title: 'Algorithm Design',
    students: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31'],
    officeHours: []
  },
  {
    number: 'Thda220',
    title: 'Physical Approaches',
    students: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31', '-L6mKXkYvRO1D8dOoqxX'],
    officeHours: []
  }
];

export const COURSE_LIST = courseList;
