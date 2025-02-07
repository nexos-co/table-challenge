import { StudentType } from "./model/student.model";

export type PaginatedResult = {
    students: StudentType[];
    nextPage: number | null;
    previousPage: number | null;
    total: number;
    currentPage: number;
    pageSize: number;
}
