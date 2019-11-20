import generateToken from '../helpers/auth';
import User from '../database/models/user';

export default {
  signup: async (req, res) => {
    const { body } = req;
    try {
      const user = await User.create(body);
      const token = generateToken(user);

      return res.status(201).json({
        status: 'success',
        data: { user, token },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  },
};
