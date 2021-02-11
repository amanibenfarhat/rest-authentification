import { Role } from './roles/role.enum';

export class CreateUserDTO {
    readonly username: string;
    readonly password: string;
    readonly roles: Role[];
    
}