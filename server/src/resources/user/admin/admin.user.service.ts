// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Create Admin User Service
class AdminUserService {
    private user = UserModel;

    /**
     * Get all users
     */
     public async getUsers(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Users
            // We remove the password when accepting all Users .select('-password');
            const users = await this.user.find({}).select('-password');

            // Checking if there are users in the database
            if (!users) {
                throw new Error('Users Not Found!');
            }

            // If successful, we return Users
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get user by ID
     */
    public async getUserById(
        userId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a user by ID in the database
            // We remove the password when the User receives the Identifier .select('-password');
            const user = await this.user.findOne({ _id: userId }).select('-password');;

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // If successful, return the user
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search users
     */
    public async findUsers(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, "i");

            // Accessing the Database to Get All Users
            // We remove the password when accepting all Users .select('-password');
            // For the fields:
            // firstname, lastname, email, roles
            // We substitute the value of the regular expression 
            // so that you can find Users by the entered content
            const users = await this.user.find({ $or: [
                { firstname: keywordRegExp },
                { lastname: keywordRegExp },
                { email: keywordRegExp },
                { roles: { $all: [keywordRegExp] } } 
            ]}).select('-password');

            // Checking if there are users in the database
            if (!users) {
                throw new Error('Users Not Found!');
            }

            // If successful, we return Users
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For user by ID
     */
    public async updateUser(
        userId: object | string,
        firstname: string,
        lastname: string,
        phoneNumber: string,
        email: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a user by ID in the database
            const user = await this.user.findOne({ _id: userId });

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // We are looking for a User with the same Email that was specified in the request body
            const userEmail = await this.user.findOne({ _id: { $ne: user._id }, email });

            // If the User with such mail already exists, then we display an error
            if (userEmail) {
                throw new Error('User Email already exists!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const userFields = {
                firstname,
                lastname,
                phoneNumber,
                email,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (userFields) {
                // User Update
                await this.user.updateOne(
                    { _id: user._id },
                    {
                        $set: userFields
                    }
                );
            }
            
            // Search for updated user
            // We remove the password when the User receives the Identifier .select('-password');
            const updatedUser = await this.user.findOne({ _id: user._id }).select('-password');
            
            // Return updated user
            return updatedUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete user by ID
     */
    public async deleteUser(
        userId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a user by ID in the database
            const user = await this.user.findOne({ _id: userId });

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // If we have found the User we want to delete in the database,
            // then we delete it from the database
            await this.user.deleteOne({ _id: userId });

            // In case of successful deletion, 
            // we return the response as a string: User with ID Deleted
            return `User with ${userId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AdminUserService;
