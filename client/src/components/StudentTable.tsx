import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PaginationType, StudentType } from "src/types";
import Pagination from "./Pagination";
import { getStudents } from "../lib/actions/student.actions";
import Header from "./Header";
import { tableHead } from "../constants";
import ActionButton from "./ActionButton";
import NotFound from "./NotFound";

const StudentTable = () => {
    const [searchParam, setSearchParam] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [stateData, setStateData] = useState<PaginationType>();
    const [selectedStudents, setSelectedStudents] = useState<StudentType[]>([]);

    useEffect(() => {
        setSelectedStudents([]);
        getStudents(currentPage, searchParam)
            .then((data) => {
                setSelectedStudents(data.students);
                setStateData(data);
            })
            .catch((e) => console.log(e))
    })

    function StatusComponents() {
        if (selectedStudents.length === 0) return <NotFound />;
        else return <></>;
    }


    return (
        <section className="container">
            <Header searchParam={searchParam} setSearchParam={setSearchParam} />
            <StatusComponents />
            <table>
                <thead>
                    <tr>
                        {selectedStudents.length > 0 &&
                            tableHead.map((headItem) => <th key={headItem}> {headItem} </th>)}
                    </tr>
                </thead>

                <tbody>
                    {selectedStudents.map((student, idx) => (
                        <tr key={student.firstName + idx}>
                            <td>
                                <UserRound />
                            </td>
                            <td>
                                {student.firstName} {student.lastName}{" "}
                                {student.email}
                            </td>
                            <td> {student.grade} </td>
                            <td> {student.age} y/o</td>
                            <ActionButton student={student}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={stateData?.currentPage}
                pageSize={stateData?.pageSize}
                nextPage={stateData?.nextPage}
                previousPage={stateData?.previousPage}
                totalItems={stateData?.total}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );


}
export default StudentTable;

