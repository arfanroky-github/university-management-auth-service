import { z } from 'zod';
import { AcademicSemesterConstant } from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(AcademicSemesterConstant.title as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum(AcademicSemesterConstant.code as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum(
      AcademicSemesterConstant.month as [string, ...string[]],
      {
        required_error: 'Start month is required',
      }
    ),
    endMonth: z.enum(AcademicSemesterConstant.month as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
