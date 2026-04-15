import {PrismaClient} from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
const prisma = new PrismaClient()


async function getTeams(req: Request, res: Response, next: NextFunction) {
    const teams = await prisma.team.findMany();
    console.log('Teams retrieved successfully');
    res.status(200).json({
        status: 'Success',
        message: 'Teams retrieved successfully',
        data: {teams}
    })
}

async function getOneTeam(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.teamId);
    const team = await prisma.team.findUnique({
        where: {
            id: id
        }
    });
    if (!team) {
        next(new AppError('Team not found', 404, 'fail'));
        return;
    }
    res.status(200).json({
        status: 'Success',
        message: 'Team retrieved successfully',
        data: {
            team
        }
    })
}

async function getPlayersByTeam(req: Request, res: Response, next: NextFunction) {
    const teamId = parseInt(req.params.teamId);
    const players = await prisma.player.findMany({
        where: {
            teamId
        },
        include: {
            team: {
                select: {
                    name: true
                }
            }
        }
    });
    if (!players) {
        next(new AppError('No players found', 404, 'fail'));
        return;
    }
    res.status(200).json({
        status: 'Success',
        message: 'Players retrieved successfully',
        data: {
            players
        }
    })
}

const changeColor = async (req: Request, res: Response, next: NextFunction) => {
    const teamId = parseInt(req.params.teamId);
    if (isNaN(teamId)) {
        next(new AppError('Team ID is invalid', 400, 'fail'));
        return;
    }
    const {newShirtColor} = req.body;
    try {
        const team = await prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                shirtColor: newShirtColor
            }
        });
        res.status(200).json({
            status: 'Success',
            message: 'Shirt color updated successfully',
            data: {
                team
            }
        })
    } catch (error) {
        if ((error as any).code === 'P2025') {
            next(new AppError('Team not found', 404, 'fail'));
            return;
        }
        next(error);
    }
}

export {
    getTeams,
    getOneTeam,
    getPlayersByTeam,
    changeColor
}