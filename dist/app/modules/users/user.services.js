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
exports.UserService = void 0;
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, user_utils_1.generatedUserId)();
    user.id = id;
    if (!user.password) {
        user.password = config_1.default.default_user_pass;
    }
    if (!user) {
        throw new Error('Failed to create user');
    }
    const createdUser = user_model_1.User.create(user);
    return createdUser;
});
exports.UserService = {
    createUserService,
};
