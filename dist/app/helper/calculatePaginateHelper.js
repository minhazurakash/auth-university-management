"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateHelper = void 0;
const calculatePaginateHelper = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return { skip, page, limit, sortBy, sortOrder };
};
exports.paginateHelper = {
    calculatePaginateHelper,
};