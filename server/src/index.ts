import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

// For Admins
import AdminUserController from './resources/user/admin/admin.user.controller';

// For Users
import UserController from '@/resources/user/user.controller';


validateEnv();

const app = new App(
    [
        // For Admins
        new AdminUserController(),

        // For Users
        new UserController(),
    ],
    Number(process.env.PORT)
);

app.listen();
