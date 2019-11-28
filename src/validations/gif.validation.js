import { check, param } from 'express-validator';

export default {
  createGifSchema: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('Title of gif post is required')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Title of gif post should not be less than 10 characters'),
  ],

  readGifSchema: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Gif ID is required')
      .isUUID()
      .withMessage('Gif ID is invalid'),
  ],

  deleteGifSchema: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Gif ID is required')
      .isUUID()
      .withMessage('Gif ID is invalid'),
  ],
};
