// Import Users Resources For Stable Work
import StockModel from '@/resources/stock/stock.model';

// Create Stock Service
class StockService {
    private stock = StockModel;

    /**
     * Get All Stocks
     */
    public async getAll(): Promise<string | object | Error> {
        try {
            // Looking for all stocks from the database
            const stocks = await this.stock.find({});

            // If we do not find stocks, then we display an error
            if (!stocks) {
                throw new Error('Stocks Not Found!');
            }

            // If successful, we return stocks and stocks
            return stocks;
        } catch (error) {
            // Server Error
            throw new Error('Unable to Stocks');
        }
    }

    /**
     * Get stock by ID
     */
     public async getStockById(
        stockId: object | string,
    ): Promise<string | object | Error> {
        try {
            const stock = await this.stock.findOne({ _id: stockId });

            if (!stock) {
                throw new Error('Stock Not Found!');
            }

            return stock;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search stocks
     */
    public async findStocks(content: string): Promise<string | object | Error> {
        try {
            const keywordRegExp = new RegExp(content, "i");

            const stocks = await this.stock.find({ title: keywordRegExp });

            if (!stocks) {
                throw new Error('Stocks Not Found!');
            }

            return stocks;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default StockService;
