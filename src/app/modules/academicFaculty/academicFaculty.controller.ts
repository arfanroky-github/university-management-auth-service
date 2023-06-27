import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyType } from './academicFaculty.interface';
import httpStatus from 'http-status';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await academicFacultyService.createFacultyToDb(
    academicFacultyData
  );

  sendResponse<AcademicFacultyType>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Faculty created successfully',
    success: true,
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {


  const result = await academicFacultyService.getAllFacultiesFromDb();
  sendResponse<AcademicFacultyType[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Faculties fetched successfully',
    data: result,
    success: true,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicFacultyService.getSingleFacultyFromDb(id);
  sendResponse<AcademicFacultyType | null>(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty fetched successfully',
    data: result,
    success: true,
  });
});

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...academicFacultyData } = req.body;
    const result = await academicFacultyService.updateFacultyFromDb(
      id,
      academicFacultyData
    );

    sendResponse<AcademicFacultyType | null>(res, {
      statusCode: httpStatus.OK,
      message: 'Faculty updated successfully',
      data: result,
      success: true,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyService.deleteFacultyFromDb(id);
    sendResponse<AcademicFacultyType | null>(res, {
      statusCode: httpStatus.OK,
      message: 'Faculty deleted successfully',
      data: result,
      success: true,
    });
  }
);
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
