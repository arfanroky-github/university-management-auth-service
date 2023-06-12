import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemester.interface';

const month: AcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const title: AcademicSemesterTitle[] = ['Autumn', 'Fall', 'Summer'];
const code: AcademicSemesterCode[] = ['01', '02', '03'];
const AcademicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Fall: '02',
  Summer: '03',
};

export const AcademicSemesterConstant = {
  month,
  title,
  code,
  AcademicSemesterTitleCodeMapper
};
