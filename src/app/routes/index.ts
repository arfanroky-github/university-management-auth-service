import express, { Router } from 'express';
// import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { SutdentRoutes } from '../modules/student/student.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';


const router = express.Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-facaulties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/student',
    route: SutdentRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

// applicaiton route
moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});
export default router;
