import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

// For Admins
import AdminUserController from './resources/user/admin/admin.user.controller';
import AdminStockController from './resources/stock/admin/admin.stock.controller';

// For Users
import UserController from '@/resources/user/user.controller';
import StockController from './resources/stock/stock.controller';


validateEnv();

const app = new App(
    [
        // For Admins
        new AdminUserController(),
        new AdminStockController(),

        // For Users
        new UserController(),
        new StockController(),
    ],
    Number(process.env.PORT)
);

app.listen();
