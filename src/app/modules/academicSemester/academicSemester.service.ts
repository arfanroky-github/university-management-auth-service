import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemesterConstant } from './academicSemester.constant';
import {
  AcademicSemesterType,
  GenericResponseType,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { PaginationOptions } from '../../../interfaces/pagination';
import calculatePagination from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

async function createSemesterToDb(
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> {
  const isMatch =
    AcademicSemesterConstant.AcademicSemesterTitleCodeMapper[payload.title];
  if (isMatch !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid semester code, Summer Code --> ${isMatch}`
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
}

async function getAllSemestersFromDb(
  PaginationOptions: PaginationOptions
): Promise<GenericResponseType<AcademicSemesterType[]>> {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(PaginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
}

export const AcademicSemesterService = {
  createSemesterToDb,
  getAllSemestersFromDb,
};
