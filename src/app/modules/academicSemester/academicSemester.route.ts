import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

// POST Method
// create a new semester
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
// GET Method
// get a single semester by id
router.get('/:id', AcademicSemesterController.getSingleSemester);

// PATCH Method
// update a single semester by id
router.patch('/:id', 
validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
AcademicSemesterController.updateSemester);

// DELETE Method
// delete a single semester by id
router.delete('/:id', AcademicSemesterController.deleteSemester);

// GET Method
// get all semesters
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
