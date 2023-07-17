"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        success: data === null || data === void 0 ? void 0 : data.success,
        message: (data === null || data === void 0 ? void 0 : data.message) || null,
        meta: (data === null || data === void 0 ? void 0 : data.meta) || null,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
    };
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(responseData);
};
exports.sendResponse = sendResponse;
