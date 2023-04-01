import { Document } from 'mongoose';

export default interface Role extends Document {
    value: string
}
