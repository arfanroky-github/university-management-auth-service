import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { Enum_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// POST Method
// create a new faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(Enum_USER_ROLE.SUPER_ADMIN, Enum_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);
// GET Method
// get a single faculty  by id
router.get(
  '/:id',
  auth(
    Enum_USER_ROLE.SUPER_ADMIN,
    Enum_USER_ROLE.ADMIN,
    Enum_USER_ROLE.FACULTY,
    Enum_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getSingleAcademicFaculty
);

// PATCH Method
// update a single faculty  by id
router.patch(
  '/:id',
  auth(
    Enum_USER_ROLE.SUPER_ADMIN,
    Enum_USER_ROLE.ADMIN,
    Enum_USER_ROLE.FACULTY
  ),
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);

// DELETE Method
// delete a single faculty  by id
router.delete(
  '/:id',
  auth(Enum_USER_ROLE.SUPER_ADMIN, Enum_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteAcademicFaculty
);

// GET Method
// get all faculty
router.get(
  '/',
  auth(Enum_USER_ROLE.SUPER_ADMIN, Enum_USER_ROLE.ADMIN),
  AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
