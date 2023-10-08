"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
// import { BookValidation } from '../book/book.validation';
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.post('/:id', 
// validateRequest(BookValidation.updateBookZodSchema),
comment_controller_1.CommentController.updateBook);
router.get('/:id', comment_controller_1.CommentController.getSingleBook);
exports.CommentRoutes = router;
