import { z } from 'zod'

// Define sub-schemas
const userNameSchema = z.object({
  firstName: z.string().trim(),
  middleName: z.string().trim(),
  lastName: z.string().trim(),
})

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

// Define the main schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      addmissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

const updateStudentValidationSchema = z.object({
  body: z.object({
    // password: z.string(),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      addmissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
