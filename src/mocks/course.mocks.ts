import {Course} from "../models/course.interface";

const courseList: Course[] = [
  {
    name: 'Comp225',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v', '-L6mKXkYvRO1D8dOoqxX'],
    times: [new Date().getTime() + 600000],
  },
  {
    name: 'Math236',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkUX52GIH7lmX5v'],
    times: [new Date().getTime() + 500000],
  },
  {
    name: 'Comp221',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31'],
    times: [new Date().getTime() + 400000],
  },
  {
    name: 'Thda220',
    studentsInQueue: ['-L6mKXkPWGkzXvGeiIhh', '-L6mKXkXCZjMfsK14X31', '-L6mKXkYvRO1D8dOoqxX'],
    times: [new Date().getTime() + 300000],
  }
];

export const COURSE_LIST = courseList;
