import { Schema } from 'mongoose';

interface Token extends Object {
    user: {
        id: Schema.Types.ObjectId;
        roles: [string];
    }
    expiresIn: number;
}

export default Token;
