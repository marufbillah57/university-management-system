import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generatedStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.addmissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    await session.startTransaction()
    // set  generated id
    userData.id = await generatedStudentId(admissionSemester)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user')
    }
    // set id, _id as user
    payload.id = newUser[0].id // embedding id
    payload.user = newUser[0]._id // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student')
    }

    await session.commitTransaction()

    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const UserServices = {
  createStudentIntoDB,
}
