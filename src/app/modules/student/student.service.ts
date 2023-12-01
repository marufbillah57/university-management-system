import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: Student) => {
  const newStudent = await StudentModel.create(student)
  return newStudent
}

const getAllStudentsFromDB = async () => {
  const students = await StudentModel.find({})
  return students
}

const getSingleStudentFromDB = async (studentId: string) => {
  const student = await StudentModel.findOne({studentId})
  return student
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
