import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    grade: string

    @Prop({ required: true })
    age: string    
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export type StudentType = Student;