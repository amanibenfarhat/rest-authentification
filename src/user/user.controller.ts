import { Body, Controller, Get, HttpStatus, Post , Res} from '@nestjs/common';
//import { Role } from './roles/role.enum';
//import { Roles } from './roles/roles.decorator';
import { UserService } from './user.service';
import {CreateUserDTO} from './createUser.dto';
import {map} from 'rxjs/operators';


@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  //@Roles(Role.ADMIN)
  async getUsers() {
    return await this.userService.getUsers();
  }
  @Post('/new')
  async addUser(@Res() res,
    @Body() createUserDTO: CreateUserDTO) {
    const user =  await this.userService.addUser(createUserDTO);
    if(typeof user === 'string'){
      return res.status(HttpStatus.CONFLICT).json({
        message: user,
        
      });
    }else{
      return res.status(HttpStatus.OK).json({
        message: 'User has been submitted successfully!',
        user: user,
      });
    }
    
  }
  @Post('/login')
  async Login(@Res() res,
    @Body() createUserDTO: CreateUserDTO) {
    const result =  await this.userService.Login(createUserDTO);
    if(typeof result === 'string'){
      return res.status(HttpStatus.CONFLICT).json({
        message: result,
      });
    }else{
      return res.status(HttpStatus.OK).json({
        message: 'User has been authentified successfully!',
        user: result,
      });
    }
    
  }
  
}
