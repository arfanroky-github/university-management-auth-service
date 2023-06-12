import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemesterToDb(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Academic Semester created successfully',
      data: result,
      success: true,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
