import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentType } from 'src/model/student.model';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { PaginatedResult } from 'src/types';
@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentType>,
        private readonly jwtService: JwtService
    ) { }

    async create(student: StudentType): Promise<{ message: string }> {
        const existingStudent = await this.studentModel.findOne({ email: student.email });
        if (existingStudent) {
            throw new ConflictException(`Email ${student.email} already has been registered`);
        }
        const newStudent = new Student({
            ...student,
            id: uuidv4
        })

        const savedStudent = await newStudent.save();

        return { message: `Student created. ID ${savedStudent.id}}` };
    }


    async getStudents(
        search: string,
        page: number,
        limit: number,
    ): Promise<PaginatedResult> {

        const skip = (page - 1) * limit;
        const filter: any = {};

        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            filter.$or = [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex },
                { age: searchRegex },
                { grade: searchRegex }
            ];
        }

        const students = await this.studentModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.studentModel.countDocuments(filter).exec();

        if (!students || students.length === 0) {
            if (Object.keys(filter).length > 0) {
                throw new NotFoundException(`No students found matching the provided filters.`);
            } else {
                throw new NotFoundException(`No students found.`);
            }
        }

        const nextPage: number | null = (page * limit) < total ? page + 1 : null;
        const previousPage: number | null = skip > 0 ? page - 1 : null;

        const result: PaginatedResult = {
            students,
            nextPage,
            previousPage,
            total,
            currentPage: page,
            pageSize: limit,
        };

        return result;
    }

    async remove(id: string): Promise<{ message: string }> {
        const student = await this.studentModel.deleteOne({ id }).exec();
        if (student.deletedCount === 0) {
            throw new NotFoundException(`Student not found`);
        }


        return { message: `Student deleted sucsessfully` };
    }

    async update(id: string): Promise<{ message: string }> {

        const student = await this.studentModel.updateOne({ id }).exec();
        if (student.modifiedCount === 0) {
            throw new ConflictException(`Student not modified`);
        }

        return { message: `Student updated` }
    }

}