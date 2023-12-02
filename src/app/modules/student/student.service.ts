import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!')
  }
  const result = await Student.create(studentData) // built in static method

  // // create an instance
  // const student = new Student(studentData) // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists')
  // }

  // const result = await student.save()

  return result
}

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
