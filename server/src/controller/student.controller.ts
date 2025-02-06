import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/student.dto';
import { StudentType } from 'src/model/student.model';
import { StudentService } from 'src/service/student.service';

@Controller('students')
export class StudentController {
    constructor(private readonly userService: StudentService) {}

    @Post('/register')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    @Get()
    async findAll(): Promise<StudentType[]> {
        return this.userService.findAll();
    }

    @Get('/find-by-id/:id')
    async findById(@Param('id') id: string): Promise<StudentType> {
        return this.userService.findById(id);
    }

    @Get('/find-by-email/:email')
    async findByEmail(@Param('email') email: string): Promise<StudentType> {
        return this.userService.findByEmail(email);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<StudentType> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
