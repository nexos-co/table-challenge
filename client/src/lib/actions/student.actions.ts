import axios from "axios";
import { PaginationType } from "../../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getStudents(
    currentPage: number,
    searchParam: string
): Promise<PaginationType> {
    try {
        const response = await axios.get(
            `${serverUrl}/api/students?page=${currentPage}&limit=5&search=${searchParam}`
        );
        return response.data;
    } catch (error: any) {
        console.error("Error fetching students:", error.message);
        return {
            students: [],
            nextPage: null,
            previousPage: null,
            total: 0,
            currentPage: 0,
            pageSize: 0,
        };
    }
}

export async function createStudent(formData: FormData) {
    const student = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        grade: formData.get("grade"),
        age: formData.get("age"),
    };

    try {
        const response = await axios.post(`${serverUrl}/api/students`, { student });
        return response.data;
    } catch (error: any) {
        console.error("Error creating student:", error.message);
    }
}

export async function deleteStudent(id: string) {
    try {
        const response = await axios.delete(`${serverUrl}/api/students/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error creating student:", error.message);
    }
}

export async function editStudent(formData: FormData, id: string) {
    const student = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        grade: formData.get("grade"),
        age: formData.get("age")
    };

    try {
        const response = await axios.put(`${serverUrl}/api/students/${id}`, { student });
        return response.data;
    } catch (error: any) {
        console.error("Error creating student:", error.message);
    }
}