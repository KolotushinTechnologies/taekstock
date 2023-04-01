// Import Engine Modules
import { Router, Request, Response, NextFunction } from 'express';

// Import Utils
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Middlewares
import authenticated from '@/middleware/authenticated.middleware';

// Import Stocks Resources For Stable Work
import StockService from '@/resources/stock/stock.service';

// Create Stock Controller
class StockController implements Controller {
    // Base path
    public path = '/stocks';
    public router = Router();
    // Connect Stock Service
    private StockService = new StockService();

    constructor() {
        // Initialize Routes For Stocks API
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // @route    GET http://localhost:5000/api/stocks/all
        // @desc     Get All Stocks
        // @access   Private
        this.router.get(
            `${this.path}/all`,
            authenticated,
            this.getAll
        );

        // @route    GET http://localhost:5000/api/stocks/:stock_id
        // @desc     Get stock by ID
        // @access   Private
        this.router.get(
            `${this.path}/:stock_id`,
            authenticated,
            this.getStockById
        );

        // @route    POST http://localhost:5000/api/stocks/searching/all
        // @desc     Search Stocks
        // @access   Private
        this.router.post(
            `${this.path}/searching/all`,
            authenticated,
            this.findStocks
        );
    }

    // @route    GET http://localhost:5000/api/stocks/all
    // @desc     Get All Stocks
    // @access   Private
    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request

            // Work Stock Service
            const stocks = await this.StockService.getAll();

            // In case of successful then send 201 Status
            res.status(200).json(stocks);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    GET http://localhost:5000/api/stocks/:stock_id
    // @desc     Get stock by ID
    // @access   Private
    private getStockById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const stockId = req.params.stock_id;
            
            // Work Stock Service
            const stockData = await this.StockService.getStockById(stockId);
            
            // In case of successful then send 201 Status
            res.status(201).json(stockData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };

    // @route    POST http://localhost:5000/api/stocks/searching/all
    // @desc     Search Brands
    // @access   Private
    private findStocks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Getting data from a request
            const { content } = req.body;

            // Work Stock Service
            const stocksData = await this.StockService.findStocks(content);
            
            // In case of successful then send 201 Status
            res.status(201).json(stocksData);
        } catch (error: any) {
            // If incorrect Data for the request is entered, an error will be displayed
            next(new HttpException(400, error.message));
        }
    };
}

export default StockController;
