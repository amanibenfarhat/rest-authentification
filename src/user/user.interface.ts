import { Role } from './roles/role.enum';
import { Document } from 'mongoose';

export interface User extends Document {
    username?: string;
    password?: string;
    role?: Role[];   
}

