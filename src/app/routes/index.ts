/* eslint-disable no-unused-vars */
import express from 'express';
import { BookRoutes } from '../modules/book/book.routes';
import { CommentRoutes } from '../modules/comment/comment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/review',
    route: CommentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
