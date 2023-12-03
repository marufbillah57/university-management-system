import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  // const zodData = studentValidationSchema.parse(studentData)

  // will call service function to send this data
  const newStudent = await UserServices.createStudentIntoDB(
    password,
    studentData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: newStudent,
  })
})

export const UserControllers = {
  createStudent,
}
