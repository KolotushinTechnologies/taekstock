// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Admin Users Resources For Stable Work
import AdminUserService from '@/resources/user/admin/admin.user.service';

// Create Admin User Controller
class AdminUserController implements Controller {
    // Base path
    public path = '/admin/users';
    public router = Router();
    // Connect Admin User Service
    private AdminUserService = new AdminUserService();

    constructor() {
        // Initialize Routes For Admin Users API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // @route    GET http://localhost:5000/api/admin/users/all
        // @desc     Get all users
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.getUsers
        );

        // @route    GET http://localhost:5000/api/admin/users/:user_id
        // @desc     Get user by ID
        // @access   Private
        this.router.get(
            `${this.path}/:user_id`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.getUserById
        );

        // @route    POST http://localhost:5000/api/admin/users/searching/all
        // @desc     Search Users
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.findUsers
        );

        // @route    PUT http://localhost:5000/api/admin/users/update/:user_id
        // @desc     Update Information For user by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:user_id`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.updateUser
        );

        // @route    DELETE http://localhost:5000/api/admin/users/:user_id
        // @desc     Delete user by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:user_id`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.deleteUser
        );
    }

    // @route    GET http://localhost:5000/api/admin/users/all
    // @desc     Get all users
    // @access   Private
    private getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Work User Service
            const usersData = await this.AdminUserService.getUsers();
            
            // In case of successful then send 201 Status
            res.status(201).json(usersData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:5000/api/admin/users/:user_id
    // @desc     Get user by ID
    // @access   Private
    private getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const userId = req.params.user_id;
            
            // Work User Service
            const userData = await this.AdminUserService.getUserById(userId);
            
            // In case of successful then send 201 Status
            res.status(201).json(userData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:5000/api/admin/users/searching/all
    // @desc     Search Users
    // @access   Private
    private findUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work User Service
            const usersData = await this.AdminUserService.findUsers(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(usersData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:5000/api/admin/users/update/:user_id
    // @desc     Update Information For user by ID
    // @access   Private
    private updateUser = async (
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

            const userId = req.params.user_id;
            
            // Work User Service
            const userData = await this.AdminUserService.updateUser(
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

    // @route    DELETE http://localhost:5000/api/admin/users/:user_id
    // @desc     Delete user by ID
    // @access   Private
    private deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const userId = req.params.user_id;
            
            // Work User Service
            const userData = await this.AdminUserService.deleteUser(
                userId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(userData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default AdminUserController;
