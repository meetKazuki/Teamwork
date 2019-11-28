import { Router } from 'express';
import article from './article.route';
import auth from './auth.route';
import gif from './gif.route';

const router = Router();

router.use('/articles', article);
router.use('/auth', auth);
router.use('/gifs', gif);

export default router;
