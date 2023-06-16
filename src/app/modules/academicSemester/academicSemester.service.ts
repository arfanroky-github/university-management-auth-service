import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  AcademicSemesterConstant,
  academicSemesterSearchableFields,
} from './academicSemester.constant';
import {
  AcademicSemesterFiltersType,
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
  filters: AcademicSemesterFiltersType,
  PaginationOptions: PaginationOptions
): Promise<GenericResponseType<AcademicSemesterType[]>> {
  const { searchTerm, ...filterData } = filters;

  // search conditions
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(PaginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
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

async function getSingleSemesterFromDb(
  id: string
): Promise<AcademicSemesterType | null> {
  const result = await AcademicSemester.findById(id);
  return result;
}

async function updateSemesterToDb(
  id: string,
  payload: Partial<AcademicSemesterType>
): Promise<AcademicSemesterType | null> {
  const isMatch =
    payload.title &&
    AcademicSemesterConstant.AcademicSemesterTitleCodeMapper[payload.title];
  if (payload.title && isMatch !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid semester code, ${payload.title} Code --> ${isMatch}`
    );
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );

  return result;
}

async function deleteSemesterFromDb(id: string): Promise<AcademicSemesterType | null> {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
}

export const AcademicSemesterService = {
  createSemesterToDb,
  getAllSemestersFromDb,
  getSingleSemesterFromDb,
  updateSemesterToDb,
  deleteSemesterFromDb
};
