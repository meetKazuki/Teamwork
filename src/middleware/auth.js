import User from '../database/models/user';

export default {
  verifyExisting: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.find({ email });
    if (user) {
      return res.status(409).json({
        status: 'error',
        error: 'email already taken',
      });
    }
    return next();
  },
};
