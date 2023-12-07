import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: academicSemesterName, required: true },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true },
)

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOneAndDelete({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists !')
  }

  next()
})

// Name Year
// 2030 Autumn => Created
// 2031 Autumn
// 2030 Autumn => XXX
// 2030 Fall => Created

// Autumn 01, Summer 02, Fall 03
