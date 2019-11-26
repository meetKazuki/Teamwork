import { Router } from 'express';
import article from './article.route';
import auth from './auth.route';

const router = Router();

router.use('/articles', article);
router.use('/auth', auth);

export default router;
