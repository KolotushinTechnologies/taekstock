// Import Engine Modules
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Import Users Resources For Stable Work
import User from '@/resources/user/user.interface';

// Creating a custom schema for the future model in the database
const UserSchema = new Schema(
    {
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, },
        phoneNumber: { type: String, trim: true, },
        email: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        roles: [{ type: String, trim: true, ref: 'Role', required: true }],
        secretCode: { type: String, trim: true, },
    },
    { timestamps: true }
);

// Hashing a user's password in a database model
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

// Validation to compare the user entered password in the query with the password in the database model
UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
