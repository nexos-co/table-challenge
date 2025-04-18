export type StudentType = {
    firstName: string,
    lastName: string,
    email: string,
    grade: string,
    age: string,
    _id: string,
}

export type PaginationType ={
    students: StudentType[],
    nextPage: number | null,
    previousPage: number | null,
    total: 0,
    currentPage: number,
    pageSize: number
}