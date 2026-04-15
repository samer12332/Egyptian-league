import {body} from 'express-validator';

const addPlayerValidation = [
    body('name')
    .trim().notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

    body('age')
    .isInt({min: 1}).withMessage('Age must be a positive integer'),

    body('salary')
    .isFloat({min: 0}).withMessage('Salary must be a positive number'),

    body('teamId')
    .isInt({min: 1}).withMessage('Team ID must be a valid integer')
]

const transferPlayerValidation = [
    body('newTeamId')
    .isInt({min: 1}).withMessage('New team ID must be a valid integer')
]

const changeSalaryValidation = [
    body('newSalary')
    .isFloat({min: 0}).withMessage('New salary must be a positive number')
]

const changeColorValidation = [
    body('newShirtColor')
    .isString().withMessage('Shirt color must be a string')
    .matches(/^#([0-9A-F]{3}){1,2}$/i).withMessage('Shirt color must be a valid hex color code')
];

const registerValidation = [
    body('name')
    .isString().withMessage('Name must be a string')
    .isLength({min: 1}).withMessage('Name is required'),

    body('email')
    .isEmail().withMessage('Email must be a valid email address'),

    body('password')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[@$!%*?&_]/).withMessage('Password must contain at least one special character')
];

const loginValidation = [
    body('email')
    .isEmail().withMessage('Email must be a valid email address'),

    body('password')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
];

export {
    addPlayerValidation,
    transferPlayerValidation,
    changeSalaryValidation,
    changeColorValidation,
    registerValidation,
    loginValidation
}