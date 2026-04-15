import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (asyncFn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFn(req, res, next).catch(next);
    };
};

export default asyncHandler;
