import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemesterConstant } from './academicSemester.constant';
import { AcademicSemesterType } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

async function createSemesterToDb(
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> {
  const isMatch = AcademicSemesterConstant.AcademicSemesterTitleCodeMapper[payload.title];
  if (isMatch !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid semester code, Summer Code --> ${isMatch}`
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
}

export const AcademicSemesterService = {
  createSemesterToDb,
};
