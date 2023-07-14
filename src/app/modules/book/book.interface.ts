import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
  reviews?: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: number;
};
