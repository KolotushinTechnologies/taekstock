import { Document } from 'mongoose';

export default interface User extends Document {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password: string;
    roles: string[];
    secretCode: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}
