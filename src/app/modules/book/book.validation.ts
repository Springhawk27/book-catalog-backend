import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.number({
      required_error: 'Publication Date is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    genre: z.string({}).optional(),
    publicationDate: z.number({}).optional(),
    reviews: z.array(z.string()).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
