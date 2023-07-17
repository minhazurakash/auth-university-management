"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const academicSemesterRoutes_1 = require("../modules/academicSemester/academicSemesterRoutes");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/user', route: user_route_1.UserRoutes },
    { path: '/academic-semesters', route: academicSemesterRoutes_1.AcademicSemesterRoutes },
];
moduleRoutes.map(route => router.use(route.path, route.route));
exports.default = router;
