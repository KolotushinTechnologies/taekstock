import { Document } from 'mongoose';

export default interface Stock extends Document {
    title: string;
    image: string;
    video:  string;
    description: string;
    author: string;
}
