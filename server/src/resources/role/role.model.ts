// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Role Resources For Stable Work
import Role from '@/resources/role/role.interface';

// Creating a custom schema for the future model in the database
const RoleSchema = new Schema(
    {
        value: {
            type: String,
            trim: true,
            unique: true,
            default: 'USER'
        },
    },
    { timestamps: true }
);

export default model<Role>('Role', RoleSchema);
