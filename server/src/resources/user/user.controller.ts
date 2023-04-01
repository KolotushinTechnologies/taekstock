// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import validationMiddleware from '@/middleware/validation.middleware';
import authenticated from '@/middleware/authenticated.middleware';

// Import Users Resources For Stable Work
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';

// Create User Controller
class UserController implements Controller {
    // Base path
    public path = '/users';
    public router = Router();
    // Connect User Service
    private UserService = new UserService();

    constructor() {
        // Initialize Routes For Users API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // @route    POST http://localhost:5000/api/users/register
        // @desc     Registration Users
        // @access   Public
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        // @route    POST http://localhost:5000/api/users/login
        // @desc     Login Users
        // @access   Public
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );

        // @route    POST http://localhost:5000/api/users/forgot-password
        // @desc     Forgot Password
        // @access   Public
        this.router.post(
            `${this.path}/forgot-password`,
            validationMiddleware(validate.forgotPassword),
            this.forgotPassword
        );

        // @route    POST http://localhost:5000/api/users/change-password
        // @desc     Change Password
        // @access   Public
        this.router.post(
            `${this.path}/change-password`,
            validationMiddleware(validate.changePassword),
            this.changePassword
        );

        // @route    PUT http://localhost:5000/api/users/change-password-profile
        // @desc     Change Password For Profile
        // @access   Private
        this.router.put(
            `${this.path}/change-password-profile`,
            authenticated,
            validationMiddleware(validate.changePasswordForProfile),
            this.changePasswordForProfile
        );

        // @route    PUT http://localhost:5000/api/users/update-my-profile
        // @desc     Update My Profile (For Authorized User)
        // @access   Private
        this.router.put(
            `${this.path}/update-my-profile`,
            authenticated,
            this.updateMyProfile
        );

        // @route    GET http://localhost:5000/api/users
        // @desc     Get User Data (For Authorized User)
        // @access   Private
        this.router.get(`${this.path}`, authenticated, this.getUser);
    }

    // @route    POST http://localhost:5000/api/users/register
    // @desc     Registration Users
    // @access   Public
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                firstname,
                lastname,
                phoneNumber,
                email,
                password,
            } = req.body;
            
            // Generating a token using a User Service Register
            // Attaching data received from the request
            const token = await this.UserService.register(
                firstname,
                lastname,
                phoneNumber,
                email,
                password,
            );
            
            // In case of successful token generation, 
            // we return to the User a token with which the User will be 
            // able to Log in to the System.
            res.status(201).json({ token });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:5000/api/users/login
    // @desc     Login Users
    // @access   Public
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { email, password } = req.body;

            // Generating a token using a User Service Login
            // Attaching data received from the request
            const token = await this.UserService.login(email, password);

            // In case of successful token generation, 
            // we return to the User a token with which the User will be 
            // able to Log in to the System.
            res.status(200).json({ token });
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:5000/api/users/forgot-password
    // @desc     Forgot Password
    // @access   Public
    private forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { email } = req.body;

            // User Service Work
            const serviceResponse = await this.UserService.forgotPassword(email);

            // Response
            res.status(200).json(serviceResponse);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:5000/api/users/change-password
    // @desc     Change Password
    // @access   Public
    private changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { email, secretCode, newPassword } = req.body;

            // User Service Work
            const token = await this.UserService.changePassword(
                email,
                secretCode,
                newPassword
            );

            // Response
            res.status(201).json(token);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:5000/api/users/change-password-profile
    // @desc     Change Password For Profile
    // @access   Private
    private changePasswordForProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { newPassword, confirmNewPassword } = req.body;

            const user = req.user.id;

            // User Service Work
            const userData = await this.UserService.changePasswordForProfile(
                user,
                newPassword,
                confirmNewPassword
            );

            // Response
            res.status(201).json(userData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    }

    // @route    PUT http://localhost:5000/api/users/update-my-profile
    // @desc     Update My Profile (For Authorized User)
    // @access   Private
    private updateMyProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                firstname,
                lastname,
                phoneNumber,
                email,
            } = req.body;

            const userId = req.user.id;
            
            // Work User Service
            const userData = await this.UserService.updateMyProfile(
                userId,
                firstname,
                lastname,
                phoneNumber,
                email,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(userData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:5000/api/users
    // @desc     Get User Data (For Authorized User)
    // @access   Private
    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        // Before receiving User Data about ourselves,
        // we check whether this User has an Authorization Token.
        if (!req.user) {
            // If the user's authorization token is not found or not recognized,
            // then we display an error
            return next(new HttpException(404, 'No logged in user'));
        }
        // In case of successful recognition of the User's Authorization Token,
        // we return to the User his Data about himself
        res.status(200).send({ data: req.user });
    };
}

export default UserController;
