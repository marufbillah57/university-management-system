import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant'

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
