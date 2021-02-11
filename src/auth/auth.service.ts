import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/user/user.interface';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}

    async generateJWT(user: User) {
        return  await (this.jwtService.signAsync({user}));
    }

    async hashPassword(password: string): Promise <string> {
        return await<string>(bcrypt.hash(password, 12));

    }

    async comparePasswords(newPassword: string, passwortHash: string){
        return await (bcrypt.compare(newPassword, passwortHash));
    }
}