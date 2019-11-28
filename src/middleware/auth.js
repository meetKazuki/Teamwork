import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApplicationError, NotFoundError } from '../helpers/error';
import { Article, User } from '../database/models';

config();

export default {
  verifyExisting: async (req, _, next) => {
    const { email } = req.body;

    const user = await User.find({ email });
    if (user) return next(new ApplicationError(409, 'user already exist'));

    return next();
  },

  verifyToken: (req, _, next) => { // eslint-disable-line
    const authHeader = req.headers.authorization
      || req.headers['x-access-token']
      || req.query.token
      || req.body.token;

    if (!authHeader) throw new ApplicationError(412, 'authorization header not set');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) return next(new ApplicationError(401, `${err.message}`));

      const { id } = decodedToken;
      const user = await User.find({ id });
      if (!user) return next(new ApplicationError(403, 'invalid credentials'));

      req.user = user;

      return next();
    });
  },

  isAdmin: (req, _, next) => {
    const { isAdmin } = req.user;
    if (!isAdmin) throw new ApplicationError(403, 'access denied. for admin only');
    next();
  },

  isAuthor: async (req, _, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await Article.find({ id });

    if (!article) throw next(new NotFoundError('article not found'));
    if (article.authorId !== userId) throw next(new ApplicationError(403, 'unauthorized. for author only!'));

    next();
  },
};
