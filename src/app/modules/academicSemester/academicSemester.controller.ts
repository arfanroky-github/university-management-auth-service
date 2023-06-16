import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../contstants/pagination';
import { AcademicSemesterType } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemesterToDb(
    academicSemesterData
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Academic Semester created successfully',
    data: result,
    success: true,
  });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemestersFromDb(
    filters,
    paginationOptions
  );

  sendResponse<AcademicSemesterType[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Semester retrived successfully',
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemesterFromDb(id);

  sendResponse<AcademicSemesterType | null>(res, {
    statusCode: httpStatus.OK,
    message: 'Semester retrived successfully',
    success: true,
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemesterToDb(
    id,
    updatedData
  );

  sendResponse<AcademicSemesterType | null>(res, {
    statusCode: httpStatus.OK,
    message: 'Semester updated successfully',
    success: true,
    data: result,
  });
});

// delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemesterFromDb(id);

  sendResponse<AcademicSemesterType | null>(res, {
    statusCode: httpStatus.OK,
    message: 'Semester deleted successfully',
    success: true,
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
