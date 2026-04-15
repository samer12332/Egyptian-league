import {PrismaClient} from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
const prisma = new PrismaClient();



const getOnePlayer = async(req: Request, res: Response, next: NextFunction) => {
    const playerId = parseInt(req.params.playerId);
    if (isNaN(playerId)) {
        return next(new AppError('Invalid Player ID format', 400, 'Bad Request'));
    }
    const player = await prisma.player.findUnique({
        where: {
            id: playerId,
        },
        include: {
            team: true
        }
    });
    if (!player) {
        next(new AppError('Player Not found', 404, 'Fail'));
        return;
    }
    res.status(200).json({
        status: 'Success',
        message: 'Player retrieved successfully',
        data: {
            player
        }
    })
}

const searchByName = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name;
    if (typeof name !== 'string') {
        next(new AppError('Name must be a string', 400, 'fail'));
        return;
    }
    if (!name) {
        next(new AppError('Name is required', 400, 'fail'));
        return;
    }
    const player = await prisma.player.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    });
    if (!player) {
        next(new AppError('No Player Found With The Given Name', 404, 'fail'));
        return;
    }
    res.status(200).json({
        status: 'Success',
        message: 'Players retrieved successfully',
        data: {
            player
        }
    })
}

const addPlayer = async (req: Request, res: Response, next: NextFunction) => {
    const info = req.body;
    const newPlayer = await prisma.player.create({
        data: info
    });
    res.status(200).json({
        status: "Success",
        message: 'Player added successfully',
        data: {
            newPlayer
        }
    });
}

const deletePlayer = async (req: Request, res: Response, next: NextFunction) => {
    const playerId = parseInt(req.params.playerId);
    if (isNaN(playerId)) {
        next(new AppError('Invalid player ID', 400, 'fail'));
        return;
    }
    try {
        await prisma.player.delete({
            where: {
                id: playerId
            }
        });
        res.status(204).json({
            status: "Success",
            message: "Player deleted successfully",
            data: null
        });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            next(new AppError('Player not found', 404, 'fail'));
            return;
        }
        next(error);
    }
};

const transferPlayer = async (req: Request, res: Response, next: NextFunction) => {
    const playerId = parseInt(req.params.playerId);
    if (isNaN(playerId)) {
        next(new AppError('Invalid player ID', 400, 'fail'));
        return;
    }
    const {newTeamId} = req.body;
    try {
        const player = await prisma.player.update({
            where: {
                id: playerId
            },
            data: {
                teamId: newTeamId
            }
        });
        res.status(200).json({
            status: "Success",
            message: 'Player transferred successfully',
            data: {
                player
            }
        })
    } catch (error) {
        if ((error as any).code === 'P2025') {
            next(new AppError('Player not found', 404, 'fail'));
            return;
        }
        next(error);
    }
}

const changeSalary = async (req: Request, res: Response, next: NextFunction) => {
    const playerId = parseInt(req.params.playerId);
    if (isNaN(playerId)) {
        next(new AppError('Invalid player ID', 400, 'fail'));
        return;
    }
    const {newSalary} = req.body;
    try {
        const player = await prisma.player.update({
            where: {
                id: playerId
            },
            data: {
                salary: newSalary
            }
        });
        res.status(200).json({
            status: "Success",
            message: 'Salary updated successfully',
            data: {
                player
            }
        })
    } catch (error) {
        if ((error as any).code === 'P2025') {
            next(new AppError('Player not found', 404, 'fail'));
            return;
        }
        next(error);
    }
}

export {
    getOnePlayer,
    searchByName,
    addPlayer,
    deletePlayer,
    transferPlayer,
    changeSalary
}