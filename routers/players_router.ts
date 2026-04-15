import express from 'express';
const router = express.Router();

import asyncHandler from '../middlewares/asyncWrapper';
import {getOnePlayer, searchByName, addPlayer, deletePlayer, transferPlayer, changeSalary} from '../controllers/players_controller';
import {addPlayerValidation, transferPlayerValidation, changeSalaryValidation} from '../middlewares/validationArrays';
import validator from '../middlewares/validation';
import authenticateToken from '../middlewares/authinticateToken';
import loggedOut from '../middlewares/loggedOut';


router.route('/').post(authenticateToken, loggedOut, addPlayerValidation, validator, asyncHandler(addPlayer));
router.route('/search').get(asyncHandler(searchByName));
router.route('/:playerId').get(asyncHandler(getOnePlayer))
.delete(authenticateToken, loggedOut, asyncHandler(deletePlayer));

router.route('/:playerId/transfer').put(authenticateToken, loggedOut, transferPlayerValidation, validator, asyncHandler(transferPlayer));

router.route('/:playerId/salary').put(authenticateToken, loggedOut, changeSalaryValidation, validator, asyncHandler(changeSalary));




export default router;