import { Request, Response, NextFunction } from "express"
import AppError from "../utils/appError";
import bcrypt from 'bcrypt';
import {generateAccessToken} from '../utils/generateJWT';
import jwt from 'jsonwebtoken';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const register = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (userExists) {
        next(new AppError('Email already exists', 409, 'fail'));
        return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash
        }
    });
    const accessToken = generateAccessToken({id: user.id, email: user.email});
    res.status(200).json({
        status: 'Success',
        message: 'User registered successfully',
        data: {
            accessToken,
            user
        }
    });
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        next(new AppError('Email not found', 404, 'fail'));
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
        next(new AppError('Incorrect password', 401, 'fail'));
        return;
    }
    const accessToken = generateAccessToken({id: user.id, email: user.email});
    res.status(200).json({
        status: 'Success',
        message: 'User logged in successfully',
        data: {
            accessToken,
            user
        }
    });
}

const tokenBlacklist: Set<string> = new Set();

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders?.split(' ')[1];
    if (!token) {
        next(new AppError('Unauthorized: Token is missing', 401, 'fail'));
        return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
        next(new AppError('Unauthorized: Invalid token', 401, 'fail'));
        return;
    }
    tokenBlacklist.add(token);
    console.log(tokenBlacklist);
    res.status(200).json({
        status: 'Success',
        message: 'User logged out successfully',
        data: null
    });
}



export {
    register,
    login,
    logout,
    tokenBlacklist
}