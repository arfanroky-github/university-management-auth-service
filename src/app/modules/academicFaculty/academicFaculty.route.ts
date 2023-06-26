import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

// POST Method
// create a new faculty 
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);
// GET Method
// get a single faculty  by id
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

// PATCH Method
// update a single faculty  by id
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);

// DELETE Method
// delete a single faculty  by id
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

// GET Method
// get all faculty 
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
