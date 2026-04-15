import express from 'express';
const router = express.Router();

import asyncHandler from '../middlewares/asyncWrapper';
import {getTeams, getOneTeam, getPlayersByTeam, changeColor} from '../controllers/teams_controller';
import {changeColorValidation} from '../middlewares/validationArrays';
import validator from '../middlewares/validation';
import authenticateToken from '../middlewares/authinticateToken';
import loggedOut from '../middlewares/loggedOut';

router.route('/').get(asyncHandler(getTeams));
router.route('/:teamId').get(asyncHandler(getOneTeam));
router.route('/:teamId/players').get(asyncHandler(getPlayersByTeam));
router.route('/:teamId/shirtColor').put(authenticateToken, loggedOut, changeColorValidation, validator, asyncHandler(changeColor));

export default router;
