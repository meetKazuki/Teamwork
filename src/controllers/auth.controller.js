import { generateToken } from '../helpers/auth';
import User from '../database/models/user';

export default {
  signup: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const token = generateToken(user);

      const newUser = user.getSafeDataValues();
      return res.status(201).json({
        status: 'success',
        data: { newUser, token },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const isUser = await User.find({ email });
      if (!isUser || !await isUser.validatePassword(password)) {
        return res.status(401).json({
          status: 'error',
          error: 'email/password incorrect',
        });
      }
      const token = generateToken(isUser);
      const user = isUser.getSafeDataValues();
      return res.status(200).json({ status: 'success', data: { user, token } });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  },
};
