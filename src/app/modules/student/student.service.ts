import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const students = await Student.find({})
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return students
}

const getSingleStudentFromDB = async (id: string) => {
  // const student = await Student.findOne({ studentId })

  // const result = await Student.aggregate([{ $match: { id: studentId } }])
  const result = await Student.findById(id)
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
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
