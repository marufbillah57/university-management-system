import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

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
  const result = await Student.findById(id)
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
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
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
