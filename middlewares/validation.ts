import {Request, Response, NextFunction} from 'express';
import AppError from '../utils/appError';
import {validationResult} from 'express-validator';

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const errMessages = errors.array().map(err => err.msg).join(', ');
        next(new AppError(errMessages, 400, 'fail'));
        return;
    }
    next();
}

export default validator;