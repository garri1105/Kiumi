import {Course} from "../models/course.interface";

const courseList: Course[] = [
  {
    number: 'Comp225',
    title: 'Software Design',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v', '-L6mKXkYvRO1D8dOoqxX'],
    times: [new Date().getTime() + 6000000],
  },
  {
    number: 'Math236',
    title: 'Linear Algebra',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v'],
    times: [new Date().getTime() + 5000000],
  },
  {
    number: 'Comp221',
    title: 'Algorithm Design',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31'],
    times: [new Date().getTime() + 4000000],
  },
  {
    number: 'Thda220',
    title: 'Physical Approaches',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31', '-L6mKXkYvRO1D8dOoqxX'],
    times: [new Date().getTime() + 3000000],
  }
];

export const COURSE_LIST = courseList;
