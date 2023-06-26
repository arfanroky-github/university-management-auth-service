import { Schema, model } from 'mongoose';
import { AcademicFacultyType } from './academicFaculty.interface';

const academicFacultySchema = new Schema<AcademicFacultyType>({
  title: { type: String, required: true },
});

export const AcademicFaculty = model<AcademicFacultyType>(
  'AcademicFaculty',
  academicFacultySchema
);
