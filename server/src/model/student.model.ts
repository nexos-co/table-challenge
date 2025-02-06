import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Student extends Document {
    @Prop({ required: true, unique: true })
    Id: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    grade: string

    @Prop({ required: true })
    age: string    
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export type StudentType = Student;