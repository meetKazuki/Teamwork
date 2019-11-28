import { Router } from 'express';
import articleController from '../controllers/article.controller';
import authMiddleware from '../middleware/auth';
import articleSchemas from '../validations/article.validation';
import validator from '../middleware/validator';

const article = Router();

const { verifyToken, isAuthor } = authMiddleware;
const {
  createSchema, readSchema, updateSchema, deleteSchema,
} = articleSchemas;
const {
  create, show, update, destroy,
} = articleController;

article.post(
  '/',
  validator(createSchema),
  verifyToken,
  create,
);

article.get(
  '/:id',
  validator(readSchema),
  verifyToken,
  show,
);

article.patch(
  '/:id',
  validator(updateSchema),
  verifyToken,
  isAuthor,
  update,
);

article.delete(
  '/:id',
  validator(deleteSchema),
  verifyToken,
  isAuthor,
  destroy,
);

export default article;
