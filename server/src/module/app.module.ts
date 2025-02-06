import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from 'src/controller/student.controller';
import { StudentSchema } from 'src/model/student.model';
import { StudentService } from 'src/service/student.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env';

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot('mongodb://root:password@localhost:27017', { dbName: "students" }),
    // Models
    MongooseModule.forFeature([
      { name: "Student", schema: StudentSchema },
    ])
  ],
  controllers: [
    StudentController,
  ],
  providers: [
    StudentService,
  ],
})
export class AppModule { }
