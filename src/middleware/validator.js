import { matchedData, validationResult } from 'express-validator';

export default (schemas) => {
  const validationCheck = async (req, res, next) => {
    const errors = validationResult(req);
    req = { ...req, ...matchedData(req) }; // eslint-disable-line

    if (!errors.isEmpty()) {
      const mappedErrs = Object
        .entries(errors.mapped())
        .reduce((acc, [key, value]) => {
          acc[key] = value.msg;
          return acc;
        }, {});

      return res.status(400).json({
        status: 'validation error',
        error: mappedErrs,
      });
    }
    return next();
  };

  return [...(schemas.length && [schemas]), validationCheck];
};
