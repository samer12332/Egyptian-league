import jwt, {JwtPayload} from 'jsonwebtoken';
import AppError from '../utils/appError';
import {Request, Response, NextFunction} from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload;
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        next(new AppError('Unauthorized: Token is missing', 401, 'fail'));
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            next(new AppError('Forbidden: Invalid token', 403, 'fail'));
            return;
        }
        req.user = user;
    });
    next();
}

export default authenticateToken;
