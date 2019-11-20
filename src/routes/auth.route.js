import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth';
import authSchemas from '../validations/auth.validations';
import validator from '../middleware/validator';

const auth = Router();

const { signupSchema } = authSchemas;
const { signup } = authController;
const { verifyExisting } = authMiddleware;

auth.post(
  '/signup',
  validator(signupSchema),
  verifyExisting,
  signup,
);

export default auth;
