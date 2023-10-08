import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

// cow creation service
const createBook = async (
  payload: IBook,
  // eslint-disable-next-line no-unused-vars
  userData: JwtPayload | null
): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

// get all cows service
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // case-insensitive
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  // console.log(result);

  const count = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

// get single book service
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

// update book service
const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  // eslint-disable-next-line no-unused-vars
  userData: JwtPayload | null
): Promise<IBook | null> => {
  // console.log('checkign from service', id, payload);

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete book service
const deleteBook = async (
  id: string,
  // eslint-disable-next-line no-unused-vars
  userData: JwtPayload | null
): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  createBook,
};
