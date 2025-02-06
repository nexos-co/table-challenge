import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/dto/student.dto';
import { Student, StudentType } from 'src/model/student.model';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private userModel: Model<StudentType>,
        private readonly jwtService: JwtService
        ) { }

    async register(user: CreateUserDto): Promise<string> {

        const isBanned = await this.bannedUserModel.findOne({ bannedEmail: user.userEmail }).exec();
        if (isBanned) {
            throw new ConflictException(`User with email ${user.userEmail} is banned and cannot register`)
        }

        const existingUser = await this.userModel.findOne({ userEmail: user.userEmail }).exec();
        if (existingUser) {
            throw new ConflictException(`User with email ${user.userEmail} already exists`);
        }

        const hashedPassword = await this.encryptionService.hashPassword(user.userPassword);

        const createdUser = new this.userModel({
            ...user,
            userId: uuidv4(),
            userPassword: hashedPassword,
        });
        const newUser = await createdUser.save();
        const generatedCode = new this.codeModel({
            id: newUser.userId,
            code: Math.floor(100000 + Math.random() * 900000)
        })

        await generatedCode.save();
        this.emailService.sendEmail(newUser.userEmail, newUser.userId, 'EMAIL_CONFIRMATION', generatedCode.code)

        return newUser.userId;
    }

    async findAll(): Promise<UserResponseType[]> {
        return this.userModel.find(
            {},
              {
               _id: 1,
                userFullName: 1,
                userId: 1,
                organizationIds: 1,
                userEmail: 1,
               }
          )
           .lean()
           .exec() as Promise<UserResponseType[]>;
    }

    async findById(userId: string): Promise<UserResponseType> {
        const user = await this.userModel.findOne({ userId },
            {
             _id: 1,
              userFullName: 1,
              userId: 1,
              organizationIds: 1,
              userEmail: 1,
             }
        )
         .lean()
         .exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }


    async findByEmail(userEmail: string): Promise<UserResponseType> {
        const user = await this.userModel.findOne({ userEmail },
            {
             _id: 1,
              userFullName: 1,
              userId: 1,
              organizationIds: 1,
              userEmail: 1,
             }
        )
         .lean()
         .exec();
        if (!user) {
            throw new NotFoundException(`User with email ${userEmail} not found`);
        }
        return user;
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserType> {
        const user = await this.userModel.findOne({userId});
        Object.assign(user, updateUserDto);

        if (updateUserDto.userPassword) {
            user.userPassword = await this.encryptionService.hashPassword(updateUserDto.userPassword);
        }

        return user.save();
    }

    async deleteUser(userId: string): Promise<{ message: string }> {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const bannedUser = new this.bannedUserModel({ bannedEmail: user.userEmail });
        await bannedUser.save();

        const result = await this.userModel.deleteOne({ userId });

        if (result.deletedCount === 0) throw new Error('User not found');

        return { message: 'User deleted successfully' };
    }




}