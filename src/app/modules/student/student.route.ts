import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';
const router = express.Router();

router.post(
  'create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const SutdentRoutes = router;
