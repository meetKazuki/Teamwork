import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth';
import authSchemas from '../validations/auth.validation';
import validator from '../middleware/validator';

const auth = Router();

const { signupSchema, signinSchema } = authSchemas;
const { isAdmin, verifyExisting, verifyToken } = authMiddleware;
const { signup, signin } = authController;

auth.post(
  '/create-user',
  verifyToken,
  isAdmin,
  validator(signupSchema),
  verifyExisting,
  signup,
);

auth.post(
  '/signin',
  validator(signinSchema),
  signin,
);

export default auth;
