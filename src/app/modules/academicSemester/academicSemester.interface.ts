import { Model } from 'mongoose';
export type AcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterCode = '01' | '02' | '03';
export type AcademicSemesterTitle = 'Autumn' | 'Fall' | 'Summer';

export type AcademicSemesterType = {
  title: AcademicSemesterTitle;
  year: number;
  code: AcademicSemesterCode;
  startMonth: AcademicSemesterMonth;
  endMonth: AcademicSemesterMonth;
};

export type GenericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type AcademicSemesterModelType = Model<AcademicSemesterType>;
