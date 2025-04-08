import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StudentType } from 'src/model/student.model';
import { StudentService } from 'src/service/student.service';
import { PaginatedResult } from 'src/types';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post('/')
    async create(@Body() createStudent: StudentType) {
        return this.studentService.create(createStudent);
    }

    @Get('/:filter')
    async getAll(
        @Param('filter') filter: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<PaginatedResult> {
        limit = Math.min(limit, 100);
        const result = await this.studentService.getStudents(filter, page, limit);
        return result;
    }

    @Put('/:id')
    async update(@Param('id') id: string){
        const result = await this.studentService.update(id);
        return result;
    }

    @Delete('/:id')
    async delete(@Param('id') id: string ){
        const result = await this.studentService.remove(id);
        return result; 
    }
}
