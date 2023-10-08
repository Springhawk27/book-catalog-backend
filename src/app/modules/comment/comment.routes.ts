import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { BookValidation } from '../book/book.validation';
import { CommentController } from './comment.controller';

const router = express.Router();

router.post(
  '/:id',
  // validateRequest(BookValidation.updateBookZodSchema),
  CommentController.updateBook
);
router.get('/:id', CommentController.getSingleBook);

export const CommentRoutes = router;
