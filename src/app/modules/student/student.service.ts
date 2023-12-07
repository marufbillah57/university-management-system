import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'
import { object } from 'joi'

const getAllStudentsFromDB = async () => {
  const students = await Student.find({})
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return students
}

const getSingleStudentFromDB = async (id: string) => {
  // const student = await Student.findOne({ studentId })

  // const result = await Student.aggregate([{ $match: { id: studentId } }])
  const result = await Student.findOne({ id })
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  /**
    guardian: {
      fatherOccupation:"Teacher"
    }
    guardian.fatherOccupation = Teacher
   */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  // console.log(modifiedUpdatedData)

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete a student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete a student')
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
