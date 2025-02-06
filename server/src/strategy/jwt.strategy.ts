import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Admin } from 'mongodb';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/env';
import { User } from 'src/model/student.model';
import { AdminService } from 'src/service/admin.service';
import { UserService } from 'src/service/student.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: any): Promise<User | Admin> {
    let userOrAdmin;

    if (payload.type === 'user') {
      userOrAdmin = await this.userService.findById(payload.sub);
      if (!userOrAdmin) {
        throw new UnauthorizedException();
      }
      return userOrAdmin; 
    } else if (payload.type === 'admin') {
      userOrAdmin = await this.adminService.findById(payload.sub);
      if (!userOrAdmin) {
        throw new UnauthorizedException();
      }
      return userOrAdmin;
    } else {
      throw new UnauthorizedException();
    }
  }
}
