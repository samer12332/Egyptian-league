import express, {Request, Response, NextFunction} from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import AppError from './utils/appError';

const port = process.env.PORT;

import teamRouter from './routers/teams_router';
import playersRouter from './routers/players_router';
import authRouter from './routers/auth_router'

app.use(express.json());

app.use('/api/teams', teamRouter);
app.use('/api/players', playersRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        status: err.statusText || 'Error',
        message: err.message,
        code: err.statusCode || 500,
        data: null
    });
});


// import crypto from 'crypto';
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret)
