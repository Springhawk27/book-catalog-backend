import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendresponse';
import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { BookService } from './book.service';

// book creation controller
const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const { ...userData } = req.user;

  const result = await BookService.createBook(bookData, userData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

// get all books controller
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single book controller
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});

// update book controller
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...userData } = req.user;
  // console.log(id, 'param er id');
  // console.log(req.body, 'body');
  // console.log(userData, 'user');

  const result = await BookService.updateBook(id, req.body, userData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

// delete cow controller
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...userData } = req.user;

  const result = await BookService.deleteBook(id, userData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
