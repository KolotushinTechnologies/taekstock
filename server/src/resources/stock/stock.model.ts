// Import Engine Modules
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Import Stocks Resources For Stable Work
import Stock from '@/resources/stock/stock.interface';

// Creating a custom schema for the future model in the database
const StockSchema = new Schema(
    {
        title: { type: String, maxlength: 150, trim: true, required: true },
        image: { type: String, trim: true },
        video:  { type: String, trim: true },
        description: { type: String, trim: true },
        author: { type: String, trim: true, required: true },
    },
    { timestamps: true }
);

StockSchema.plugin(uniqueValidator, { message: '{PATH} is already exists!' });

StockSchema.index({ '$**' : 'text' });

export default model<Stock>('Stock', StockSchema);
