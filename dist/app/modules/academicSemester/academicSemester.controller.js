"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../constants/pagination");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createAcademicSemester = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newSemester = yield academicSemester_service_1.academicSemesterService.createAcademicSemester(req === null || req === void 0 ? void 0 : req.body);
    res.status(200).json({
        success: true,
        message: 'AcademicSemester created successful',
        data: newSemester,
    });
    next();
}));
const getAcademicSemesters = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req === null || req === void 0 ? void 0 : req.query, ['searchTerm', 'title', 'code', 'year']);
    const paginationOptios = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield academicSemester_service_1.academicSemesterService.getAcademicSemesters(filters, paginationOptios);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'semester fetched successful',
        meta: result.meta,
        data: result.data,
    });
    next();
}));
const getSingleAcademicSemester = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.getSingleAcademicSemester(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'single semester fetched successful',
        data: result,
    });
    next();
}));
const updateAcademicSemester = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = req.body;
    const result = yield academicSemester_service_1.academicSemesterService.updateAcademicSemester(req.params.id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester update successful',
        data: result,
    });
    next();
}));
exports.AcademicSemesterController = {
    createAcademicSemester,
    getAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
};
