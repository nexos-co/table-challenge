import { createStudent, editStudent } from "src/lib/actions/student.actions";
import { StudentType } from "src/types";
import { FormEvent, use, useContext, useState } from "react";


const CreateStudentForm = ({
        student,
        edit,
    }: {
        student?: StudentType;
        edit: boolean;
    }
) => {
    const defaultStudent = {
        firstName: student?.firstName,
        lastName: student?.lastName,
        email: student?.email,
        age: student?.age,
        grade: student?.grade,
      };
      const selectPromise = async (formData: FormData) =>
        edit ? await editStudent(formData, student!._id) : await createStudent(formData);
    
    return (
        <div>

        </div>
    )


}
export default CreateStudentForm;