import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../contstants/pagination';
import { AcademicSemesterType } from './academicSemester.interface';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemestersFromDb(
      paginationOptions
    );

    sendResponse<AcademicSemesterType[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Semester retrived successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
    next()
  }
  
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
