/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
// import studentValidationSchema from '../student/student.validation'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    // const zodData = studentValidationSchema.parse(studentData)

    // will call service function to send this data
    const newStudent = await UserServices.createStudentIntoDB(
      password,
      studentData,
    )

    // send response
    // res.status(201).json({
    //   success: true,
    //   message: 'Student created successfully',
    //   data: newStudent,
    // })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: newStudent,
    })
  } catch (error) {
    next(error)
  }
}

export const UserControllers = {
  createStudent,
}
