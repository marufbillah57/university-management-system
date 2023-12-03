import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!')
  // }

  // create user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  // if (!password) {
  //   user.password = config.default_password as string
  // } else {
  //   user.password = password
  // }

  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = 'student'

  // set manually generated id
  userData.id = '2030100001'

  // create a user
  const newUser = await User.create(userData) // built in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id // embedding id
    studentData.user = newUser._id // reference _id

    const newStudent = await Student.create(studentData)
    return newStudent
  }

  return newUser
}

export const UserServices = {
  createStudentIntoDB,
}
