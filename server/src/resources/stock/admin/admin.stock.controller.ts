// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import multer from "@/utils/multer";

// Import Middlewares
import validationMiddleware from '@/middleware/validation.middleware';
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from '@/middleware/role.middleware';

// Import Admin Stocks Resources For Stable Work
import validate from '@/resources/stock/stock.validation';
import AdminStockService from '@/resources/stock/admin/admin.stock.service';

// Create Admin Stock Controller
class AdminStockController implements Controller {
    // Base path
    public path = '/admin/stocks';
    public router = Router();
    // Connect Admin Stock Service
    private AdminStockService = new AdminStockService();

    constructor() {
        // Initialize Routes For Admin Stocks API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // @route    POST http://localhost:5000/api/admin/stocks/create
        // @desc     Register a new stock
        // @access   Private
        this.router.post(
            `${this.path}/create`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            multer.single('file'),
            validationMiddleware(validate.create),
            this.create
        );

        // @route    PUT http://localhost:5000/api/admin/stocks/update/:stock_id
        // @desc     Update Information For stock by ID
        // @access   Private
        this.router.put(
            `${this.path}/update/:stock_id`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            multer.single('file'),
            validationMiddleware(validate.update),
            this.updateStock
        );

        // @route    DELETE http://localhost:5000/api/admin/stocks/:stock_id
        // @desc     Delete stock by ID
        // @access   Private
        this.router.delete(
            `${this.path}/:stock_id`,
            authenticated,
            roleMiddleware(['SuperAdmin']),
            this.deleteStock
        );
    }

    // @route    POST http://localhost:5000/api/admin/stocks/create
    // @desc     Register a new stock
    // @access   Private
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                title,
                description,
                author,
            } = req.body;

            const file: any = req.file;
            
            // Work Admin Stock Service
            const stockData = await this.AdminStockService.create(
                title,
                description,
                author,
                file,
                req,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(stockData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    PUT http://localhost:5000/api/admin/stocks/update/:stock_id
    // @desc     Update Information For stock by ID
    // @access   Private
    private updateStock = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const {
                title,
                description,
                author,
                statusChangeFile
            } = req.body;

            const stockId = req.params.stock_id;

            const file: any = req.file;
            
            // Work Admin Stock Service
            const stockData = await this.AdminStockService.updateStock(
                stockId,
                title,
                description,
                author,
                statusChangeFile,
                file,
                req
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(stockData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    DELETE http://localhost:5000/api/admin/stocks/:stock_id
    // @desc     Delete stock by ID
    // @access   Private
    private deleteStock = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const stockId = req.params.stock_id;
            
            // Work Admin Stock Service
            const stockData = await this.AdminStockService.deleteStock(
                stockId,
            );
            
            // In case of successful then send 201 Status
            res.status(201).json(stockData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default AdminStockController;
