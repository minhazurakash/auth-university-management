"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = __importDefault(require("../../error/handleValidationError"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const logger_1 = require("../../shared/logger");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../error/handleZodError"));
const handleCastError_1 = __importDefault(require("../../error/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    process.env.NODE_ENV === 'development'
        ? console.log('Global error handler', error)
        : logger_1.errorLogger.error('Global error handler', error);
    let statusCode = 500;
    let message = 'Somethingn went wrong';
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }] : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.node_env) ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
