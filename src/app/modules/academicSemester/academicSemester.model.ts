import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModelType,
  AcademicSemesterType,
} from './academicSemester.interface';
import { AcademicSemesterConstant } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<AcademicSemesterType>({
  title: { type: String, required: true, enum: ['Autumn', 'Fall', 'Summer'] },
  startMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterConstant.month,
  },
  endMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterConstant.month,
  },
  code: { type: String, required: true, enum: ['01', '02', '03'] },
  year: { type: Number, required: true },
});

// hanldling same year and same semester issue student can't create same year same title
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  // exist
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic semester already exist');
  }

  next();
});

export const AcademicSemester = model<
  AcademicSemesterType,
  AcademicSemesterModelType
>('AcademicSemester', academicSemesterSchema);
