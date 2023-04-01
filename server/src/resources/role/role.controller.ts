// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import validationMiddleware from '@/middleware/validation.middleware';
import authenticated from '@/middleware/authenticated.middleware';

// Import Roles Resources For Stable Work
import validate from '@/resources/role/role.validation';
import RoleService from '@/resources/role/role.service';

// Create Role Controller
class RoleController implements Controller {
    // Base path
    public path = '/roles';
    public router = Router();
    // Connect Role Service
    private RoleService = new RoleService();

    constructor() {
        // Initialize Routes For Chains API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // @route    POST http://localhost:5000/api/roles/create
        // @desc     Create A New Role
        // @access   Private
        this.router.post(
            `${this.path}/create`,
            authenticated,
            validationMiddleware(validate.create),
            this.create
        );
    }

    // @route    POST http://localhost:5000/api/roles/create
    // @desc     Create A New Role
    // @access   Private
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { value } = req.body;
            
            // Work Role Service
            const roleData = await this.RoleService.create(
                value
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(roleData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default RoleController;
