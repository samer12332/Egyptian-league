import express from 'express';
const router = express.Router();

import {register, login, logout} from '../controllers/auth_controller';
import asyncHandler from '../middlewares/asyncWrapper';
import {registerValidation, loginValidation} from '../middlewares/validationArrays';
import validator from '../middlewares/validation';
import authenticateToken from '../middlewares/authinticateToken';
import loggedOut from '../middlewares/loggedOut';

router.route('/register').post(registerValidation, validator, asyncHandler(register));
router.route('/login').post(loginValidation, validator, asyncHandler(login));
router.route('/logout').post(authenticateToken, loggedOut, asyncHandler(logout));





export default router;