import { check, param } from 'express-validator';

export default {
  createSchema: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('Title of article is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Title should not be less than 10 characters'),

    check('article')
      .not()
      .isEmpty()
      .withMessage('Body of article is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Body of article should not be less than 10 characters'),
  ],

  readSchema: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Article ID is required')
      .isUUID()
      .withMessage('Article ID is invalid'),
  ],

  updateSchema: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Article ID is required')
      .isUUID()
      .withMessage('Article ID is invalid'),

    check('title')
      .not()
      .isEmpty()
      .withMessage('Title of article is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Title should not be less than 10 characters'),

    check('article')
      .not()
      .isEmpty()
      .withMessage('Body of article is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Body of article should not be less than 10 characters'),
  ],

  deleteSchema: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Article ID is required')
      .isUUID()
      .withMessage('Article ID is invalid'),
  ],

  createCommentSchema: [
    check('comment')
      .not()
      .isEmpty()
      .withMessage('Body of comment is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Body of comment should not be less than 10 characters'),

    param('id')
      .not()
      .isEmpty()
      .withMessage('Article ID is required')
      .isUUID()
      .withMessage('Article ID is invalid'),
  ],
};
