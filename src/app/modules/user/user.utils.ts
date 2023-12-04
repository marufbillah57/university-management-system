import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// find last
const findLastStudentId = async () => {
  const lastSutudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean() // here not mongoose any operation because lean use

  //203001 0001
  return lastSutudent?.id ? lastSutudent.id.substring(6) : undefined
}

// year semesterCode 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  // 0001 => 1

  const currentId = (await findLastStudentId()) || (0).toString()
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
