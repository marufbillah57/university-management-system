import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemester.create()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
}
