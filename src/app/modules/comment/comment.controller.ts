import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendresponse';
import { IBook } from '../book/book.interface';
import { CommentService } from './comment.service';

// get single book controller
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review fetched successfully',
    data: result,
  });
});

// update book controller
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('ekhane');
  console.log(req.body, 'body');

  const { review } = req.body;
  console.log(review);

  const { ...userData } = req.user;
  // console.log(id, 'param er id');
  // console.log(req.body, 'body');
  // console.log(userData, 'user');

  const result = await CommentService.updateBook(id, review, userData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review added successfully',
    data: result,
  });
});

export const CommentController = {
  getSingleBook,
  updateBook,
};
