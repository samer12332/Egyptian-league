import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h'});
}


export {
    generateAccessToken
}