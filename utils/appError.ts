class AppError extends Error {
    statusCode: number;
    statusText: string;
    constructor(message: string, statusCode: number, statusText: string) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError