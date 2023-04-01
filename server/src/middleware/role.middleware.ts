// Import Engine Modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Import Utils
import token from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';

// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Create Middleware Function
function roleMiddleware(roles: string[]) {
    return async function (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        const bearer = req.headers.authorization;

        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        const accessToken = bearer.split('Bearer ')[1].trim();
        try {
            const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
                accessToken
            );

            if (payload instanceof jwt.JsonWebTokenError) {
                return next(new HttpException(401, 'Unauthorised'));
            }

            const user = await UserModel.findById(payload.user.id)
                .select('-password')
                .exec();

            if (!user) {
                return next(new HttpException(401, 'Unauthorised'));
            }

            let hasRole: boolean = false;

            user.roles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({ message: "Access denied!" });
            }

            return next();
        } catch (error) {
            return next(new HttpException(401, 'Unauthorised'));
        }
    }
}

export default roleMiddleware;
