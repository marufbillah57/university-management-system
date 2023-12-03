import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const students = await Student.find({})
  return students
}

const getSingleStudentFromDB = async (studentId: string) => {
  // const student = await Student.findOne({ studentId })

  const result = await Student.aggregate([{ $match: { id: studentId } }])
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })

  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
