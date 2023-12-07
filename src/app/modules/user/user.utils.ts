import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// find last
const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean() // here not mongoose any operation because lean use

  //203001 0001
  return lastStudent?.id ? lastStudent.id : undefined
}

// year semesterCode 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  // 0001 => 1

  let currentId = (0).toString() // 0000 by default

  const lastStudentId = await findLastStudentId()
  // 2030010001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) // 01
  const lastStudentYear = lastStudentId?.substring(0, 4) // 2030
  const currentSemesterCode = payload.code
  const currentSemesterYear = payload.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6) // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
