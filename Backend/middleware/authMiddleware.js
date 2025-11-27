import { User } from '../database/models/index.js';
export const isAuthenticated = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'Unauthorized!' });
  const user = await User.findByPk(userId);
  if (!user) return res.status(401).json({ error: 'User Not Found!' });
  req.user = user;
  next();
};