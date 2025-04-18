import { deleteStudent } from "../lib/actions/student.actions";

const DialogModal = ({
    onCloseDialog,
    studentId,
  }: {
    onCloseDialog: () => void;
    studentId: string;
  }) => {
  
    const clickOnDelete = async () => {  
      await deleteStudent(studentId)
        .then(() => {
          onCloseDialog();
        })
        .catch(() => Error("Failed to remove student"))
    };
  
    return (
      <div className="modal dialog">
        <div className="dialog_container">
          <h1>Do you want to remove the student? </h1>
  
          <div className="button_container">
            <button onClick={onCloseDialog} className="btn_exit">
              Cancel
            </button>
            <button onClick={clickOnDelete} className="btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DialogModal;