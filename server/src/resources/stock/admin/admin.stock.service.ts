// Import Stocks Resources For Stable Work
import StockModel from '@/resources/stock/stock.model';

// Create Admin Stock Service
class AdminStockService {
    private stock = StockModel;

    /**
     * Register a new stock
     */
     public async create(
        title: string,
        description: string,
        author: string,
        file: any,
        req: any,
    ): Promise<string | object | null | Error> {
        try {
            const stockFields: any = {
                title,
                description,
                author,
            };

            if (file) {
                // Link generation for subsequent access to the stocks's image
                const image = `${req.protocol}://${
                    req.headers.host
                    }/files/images/attachments/${file.path.split("\\").pop()}`;
                    
                stockFields.image = image.split("/src/public/files/images/attachments/").join("/");
            }

            const newStock = await this.stock.create(stockFields);

            return newStock;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For stock by ID
     */
     public async updateStock(
        stockId: object | string,
        title: string,
        description: string,
        author: string,
        statusChangeFile: boolean,
        file: any,
        req: any,
    ): Promise<string | object | null | Error> {
        try {
            const stockFields: any = {
                title,
                description,
                author,
            };
            
            if (statusChangeFile === false && file === undefined) {
                stockFields.image = "";
            }
            
            if (file && statusChangeFile === true) {
                // Link generation for subsequent access to the supplier's image
                const image = `${req.protocol}://${
                    req.headers.host
                    }/files/images/attachments/${file.path.split("\\").pop()}`;
                    
                stockFields.image = image.split("/src/public/files/images/attachments/").join("/");
            }
            
            const updatedStock = await this.stock.findOneAndUpdate(
                { _id: stockId },
                {
                    $set: stockFields
                },
                { new: true },
            );
            
            return updatedStock;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete stock by ID
     */
    public async deleteStock(
        stockId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            const doc = await this.stock.findOneAndDelete(
                { _id: stockId }
            );

            if (!doc) {
                throw new Error('Stock Not Found!');
            }

            return `Stock ${doc._id} Has been Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AdminStockService;
