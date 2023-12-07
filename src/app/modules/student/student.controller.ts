/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res) => {
  const students = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: students,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const student = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: student,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(studentId, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params

  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
