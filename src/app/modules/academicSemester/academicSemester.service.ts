import { academicSemesterCodeMapper } from './academicSemester.constant'
import {
  TAcademicSemester,
  TAcademicSemesterCode,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemesterCode) => {
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemesterIntDB = async () => {
  const result = await AcademicSemester.find()

  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)

  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
