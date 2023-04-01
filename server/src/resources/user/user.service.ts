// Import Engine
import bcrypt from 'bcrypt';

// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Import Roles Resources For Stable Work
import RoleModel from "@/resources/role/role.model";

// Import Utils
import token from '@/utils/token';
import { generateCode } from '@/utils/generateCode';

// Create User Service
class UserService {
    private user = UserModel;
    private role = RoleModel;

    /**
     * Register a new user
     */
    public async register(
        firstname: string,
        lastname: string,
        phoneNumber: string,
        email: string,
        password: string,
    ): Promise<string | Error> {
        try {
            // We are looking for the role of the User for future assignment
            const roleUser: any = await this.role.findOne({ value: 'User' });

            // If there are no roles in the database, then create a user role
            if (!roleUser) {
                await this.role.create({
                    value: 'User',
                });
            }

            // We find the User with the same Email in the database, 
            // if there is no User with the same Email in the database, 
            // then we register a new User
            const userIsExist = await this.user.findOne({ email });

            // If the User with such Email already exists, then we issue an error
            if (userIsExist) {
                throw new Error('Server Error');
            }

            // If the User's Email is not busy, then create a new User. Adding a User role
            const user = await this.user.create({
                firstname,
                lastname,
                phoneNumber,
                email,
                password,
                roles: [roleUser.value]
            });

            // Based on the Data created for the User, 
            // we create an access token to the User's account
            const accessToken = token.createToken(user);

            // If everything is successful, 
            // then return the access token to the User Profile
            return accessToken;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            // User search by email
            const user = await this.user.findOne({ email });

            // If the User with such mail does not exist, then we return an error
            if (!user) {
                throw new Error('Server Error');
            }

            // We check if the User entered the correct password, 
            // which matches the password in the database
            if (await user.isValidPassword(password)) {
                // If the password is correct, 
                // then we return a new access token to the User Profile
                return token.createToken(user);
            } else {
                // If the password is incorrect, then we return an error.
                throw new Error('Something went wrong...');
            }
        } catch (error) {
            // Server Error
            throw new Error('Unable to login user');
        }
    }

    /**
     * Forgot Password. |TODO: Will this functionality exist?|
     */
    public async forgotPassword(
        email: string
    ): Promise<string | Error> {
        try {
            const userCreator = await this.user.findOne({ email: email });

            if (!userCreator) {
                throw new Error('Please Try Again!');
            }

            const code = generateCode();

            await this.user.updateOne(
                { email: email },
                {
                    $set: { secretCode: code }
                }
            );

            return "Please, check the Email! MProject has sent you a verification code!"
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Change Password. |TODO: Will this functionality exist?|
     */
     public async changePassword(
        email: string,
        secretCode: string,
        newPassword: string
    ): Promise<string | Error> {
        try {
            const userCreator = await this.user.findOne({ email: email });

            if (!userCreator) {
                throw new Error('Please Try Again!');
            }

            if (secretCode !== userCreator.secretCode) {
                throw new Error('Wrong credentials given')
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await this.user.updateOne(
                { email: userCreator.email },
                {
                    // TODO: Generate Any Numbers
                    $set: {
                        secretCode: null,
                        password: hashPassword
                    }
                }
            );

            return token.createToken(userCreator);
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Change Password For Profile. |TODO: Will this functionality exist?|
     */
     public async changePasswordForProfile(
        userId: string | object,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<string | object | null | Error> {
        try {
            // We are looking for the User in the Database 
            // (Determining if he is the owner of the Profile?)
            const user = await this.user.findOne({ _id: userId });

            // If we did not find the User in the database, then we give an error
            if (!user) {
                throw new Error('Something went wrong...');
            }

            // Check if the entered new passwords match
            // If not, then we return an error.
            if (newPassword !== confirmNewPassword) {
                throw new Error('Passwords do not match!');
            }

            // If the entered passwords match, then create a new hash
            // So we encrypt the password in the database
            const hashPassword = await bcrypt.hash(confirmNewPassword, 10);

            // Update the password in the database
            await this.user.updateOne(
                { email: user.email },
                {
                    $set: {
                        password: hashPassword
                    }
                }
            );

            // If successful, we find the updated User in the database
            const updatedUser = await this.user.findOne({ _id: user._id });

            // If we found an Updated User, then we return it to the User
            return updatedUser;
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Update My Profile (For Authorized User)
     */
     public async updateMyProfile(
        userId: object | string,
        firstname: string,
        lastname: string,
        phoneNumber: string,
        email: string,
    ): Promise<string | object | null | Error> {
        try {
            // We are looking for the User in the Database 
            // (Determining if he is the owner of the Profile?)
            const user = await this.user.findOne({ _id: userId });

            // If we did not find the User in the database, then we give an error
            if (!user) {
                throw new Error('Something went wrong...');
            }

            // We are looking for a User with the same Email that was specified in the request body
            const userEmail = await this.user.findOne({ _id: { $ne: user._id }, email });

            // If the User with such mail already exists, then we display an error
            if (userEmail) {
                throw new Error('User Email already exists!');
            }

            // All fields from the request body, 
            // the values of which we want to update for the database in the fields of the User, 
            // are added to one object
            const userFields = {
                firstname,
                lastname,
                phoneNumber,
                email,
            };

            // Update all entered fields in the request body in the database for the user
            if (userFields) {
                await this.user.updateOne(
                    { _id: user._id },
                    {
                        $set: userFields
                    }
                );
            }
            
            // If successful, we find the updated User in the database
            const updatedUser = await this.user.findOne({ _id: user._id }).select('-password -roles');

            // If we found an Updated User, then we return it to the User
            return updatedUser;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }
}

export default UserService;
