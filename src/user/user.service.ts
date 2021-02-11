import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User , UserDocument} from './user.model';
import {CreateUserDTO} from './createUser.dto';
import {AuthService} from '../auth/auth.service';


@Injectable()
export class UserService {
    constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService) {}

    async getUsers()  {
        const users = await this.userModel.find().exec();
        return users;
    }
    async addUser(createUserDTO : CreateUserDTO) {
        const exist = await this.userModel.findOne({username : createUserDTO.username} ).exec();
        if(exist){
            return 'username exist !';
        }else{
            const user = new this.userModel(createUserDTO);
            const hashed = await this.authService.hashPassword(user.password);
            user.password = hashed;
            const saved_user = await user.save();
            const token = this.authService.generateJWT(user);
            return  token;
        }
       
        
    }
    async Login(createUserDTO : CreateUserDTO) {
        const user = await this.userModel.findOne({username : createUserDTO.username} ).exec();
        //console.log(user);
        if(!user){
            return 'wrong username taped';
        }else{
            if(await this.authService.comparePasswords(createUserDTO.password, user.password)){
                return  this.authService.generateJWT(user);
            }else{
                return 'wrong password inserted taped';
            }
            
            
        }
       
        
    }
    
 
}
