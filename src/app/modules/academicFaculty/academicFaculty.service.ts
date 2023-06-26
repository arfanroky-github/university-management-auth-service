import { AcademicFacultyType } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

async function createFacultyToDb(
  payload: AcademicFacultyType
): Promise<AcademicFacultyType> {
  const result = await AcademicFaculty.create(payload);
  return result;
}

async function getAllFacultiesFromDb(): Promise<AcademicFacultyType[]> {
  const result = await AcademicFaculty.find();
  return result;
}

async function getSingleFacultyFromDb(
  id: string
): Promise<AcademicFacultyType | null> {
  const result = await AcademicFaculty.findById(id);
  return result;
}

async function updateFacultyFromDb(
  id: string,
  payload: AcademicFacultyType
): Promise<AcademicFacultyType | null> {
  const result = await AcademicFaculty.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );
  return result;
}

async function deleteFacultyFromDb(id: string): Promise<AcademicFacultyType | null> {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
}

export const academicFacultyService = {
  createFacultyToDb,
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateFacultyFromDb,
  deleteFacultyFromDb,
};
