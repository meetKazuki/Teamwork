import { ApplicationError, NotFoundError } from '../helpers/error';
import { Article } from '../database/models';

export default {
  create: async (req, res, next) => {
    const { user, body } = req;
    try {
      const article = await Article.create({
        article: body.article,
        title: body.title,
        authorId: user.id,
      });
      return res.status(201).json({ status: 'success', data: article });
    } catch (error) {
      return next(new ApplicationError(500, error));
    }
  },

  show: async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const article = await Article.find({ id });
      if (!article) return next(new NotFoundError('article not found'));

      return res.status(200).json({ status: 'success', data: article });
    } catch (error) {
      return next(new ApplicationError(500, error));
    }
  },

  update: async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
      const article = await Article.find({ id });
      const updatedArticle = await article.update(body);
      return res.status(200).json({ status: 'success', data: updatedArticle });
    } catch (error) {
      return next(new ApplicationError(500, error));
    }
  },

  destroy: async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const article = await Article.find({ id });
      await article.delete(article);
      return res.status(200).json({ status: 'success', data: 'article deleted' });
    } catch (error) {
      return next(new ApplicationError(500, error));
    }
  },
};
