import { Request, Response, NextFunction } from 'express';
import {tokenBlacklist} from '../controllers/auth_controller';
import AppError from '../utils/appError';

const loggedOut = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        console.log(2);
        next(new AppError('Forbidden: Token is blacklisted', 403, 'fail'));
        return;
    }
    next();
};

export default loggedOut;