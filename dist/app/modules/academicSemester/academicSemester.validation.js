"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterConstant.title], {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({
            required_error: 'year is requiere',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterConstant.code], {
            required_error: 'code is require',
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterConstant.month], {
            required_error: 'startMonth is require',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterConstant.month], {
            required_error: 'endMonth is require',
        }),
    }),
});
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterConstant.title], {
            required_error: 'title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'year is require',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterConstant.code], {
            required_error: 'code is require',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterConstant.month], {
            required_error: 'startMonth is require',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterConstant.month], {
            required_error: 'endMonth is require',
        })
            .optional(),
    }),
})
    .refine(data => {
    var _a, _b, _c, _d;
    return (((_a = data === null || data === void 0 ? void 0 : data.body) === null || _a === void 0 ? void 0 : _a.title) && ((_b = data === null || data === void 0 ? void 0 : data.body) === null || _b === void 0 ? void 0 : _b.code)) ||
        (!((_c = data === null || data === void 0 ? void 0 : data.body) === null || _c === void 0 ? void 0 : _c.title) && !((_d = data === null || data === void 0 ? void 0 : data.body) === null || _d === void 0 ? void 0 : _d.code));
}, {
    message: 'Either both title and code or neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
