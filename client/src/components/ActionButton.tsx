import { useContext, useState } from "react";
import { StudentType } from "src/types";
import { getStudents, createStudent, deleteStudent, editStudent } from "src/lib/actions/student.actions"; // Import your API functions
import useSWR from 'swr';
import DeleteModal from "./DeleteModal";
import { PenLine, Trash } from "lucide-react";
import { Tooltip } from "./ui/tooltip";
import StudentForm from "./StudentForm";

function ActionButtons({ student }: { student: StudentType }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const defaultStudent = {
        firstName: student?.firstName,
        lastName: student?.lastName,
        email: student?.email,
        age: student?.age,
        grade: student?.grade,
      };

    const clickOnDelete = () => {
        setOpenDeleteModal(!openDeleteModal);
    };

    const clickOnEdit = () => {
        setOpenEditModal(!openEditModal); 
    };
    return (
        <td className="buttons">
            {openDeleteModal && (
                <DeleteModal
                    studentId={student._id}
                    onCloseDialog={() => setOpenDeleteModal(false)}
                />
            )}
            {openEditModal && (
                <StudentForm
                    studentId={student._id}
                    initialValues={defaultStudent} 
                    onClose={() => setOpenEditModal(false)}
                    open = {false}
                />
            )}
            <Tooltip title="Edit">
                <PenLine onClick={clickOnEdit} color="green" style={{ cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="Delete">
                <Trash onClick={clickOnDelete} color="red" style={{ cursor: 'pointer' }} />
            </Tooltip>
        </td>
    );


}
export default ActionButtons;
