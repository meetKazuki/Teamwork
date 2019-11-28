import { check } from 'express-validator';

export default {
  signupSchema: [
    check('firstname')
      .not()
      .isEmpty()
      .withMessage('Firstname is required')
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage('Firstname should be between 2 to 15 characters')
      .isAlpha()
      .withMessage('Firstname should only contain alphabets')
      .customSanitizer((firstname) => firstname.toLowerCase()),

    check('lastname')
      .not()
      .isEmpty()
      .withMessage('Lastname is required')
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage('Lastname should be between 2 to 15 characters')
      .isAlpha()
      .withMessage('Lastname should only contain alphabets')
      .customSanitizer((lastname) => lastname.toLowerCase()),

    check('gender')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Gender is required')
      .isIn(['male', 'female'])
      .withMessage("Accepted values are 'male' or 'female'"),

    check('jobRole')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Job role is required')
      .isLength({ min: 3 })
      .withMessage('Job role should be between 3 to 25 characters'),

    check('department')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Department is required')
      .isLength({ min: 3 })
      .withMessage("Staff's department should be between 3 to 25 characters"),

    check('address')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Address is required')
      .isLength({ min: 10 })
      .withMessage('Address must be more than 10 characters'),

    check('email')
      .not()
      .isEmpty()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail(),

    check('password')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password cannot be blank')
      .isLength({ min: 8 })
      .withMessage('Password should be between 8 to 15 characters'),
    /* .isAlphanumeric() .withMessage('Password must be alphanumeric') */
  ],

  signinSchema: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail(),

    check('password')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password cannot be blank')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric'),
  ],
};
