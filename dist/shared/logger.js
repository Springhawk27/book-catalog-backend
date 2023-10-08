"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerError = exports.loggerInfo = void 0;
/* eslint-disable no-undef */
// import winston from 'winston'
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    return `${date.toString()} [${label}] ${level}: ${message}`;
});
const loggerInfo = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'Successful!' }), timestamp(), myFormat, prettyPrint()),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'uoa-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.loggerInfo = loggerInfo;
const loggerError = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'Unsuccessful!' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'uoa-%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.loggerError = loggerError;
