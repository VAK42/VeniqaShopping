import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../database/models/index.js';
import config from '../config/config.js';
export const signup = async (data) => {
  const hashedPassword = bcryptjs.hashSync(data.password, 10);
  const emailConfirmationToken = uuidv4();
  const referralToken = uuidv4().slice(0, 6);
  const user = await User.create({ ...data, password: hashedPassword, emailConfirmationToken, referralToken });
  console.log(`[Email]: Confirm Account ${config.frontendUrls.emailConfirmation}/${emailConfirmationToken}`);
  return { email: user.email, name: user.name, id: user.id };
};
export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User Not Found!');
  const isValid = bcryptjs.compareSync(password, user.password);
  if (!isValid) throw new Error('Invalid Password!');
  return { id: user.id, email: user.email, name: user.name, cart: user.cart, emailConfirmed: !user.emailConfirmationToken };
};
export const confirmEmail = async (token) => {
  const user = await User.findOne({ where: { emailConfirmationToken: token } });
  if (!user) throw new Error('Invalid Token!');
  user.emailConfirmationToken = null;
  await user.save();
  return { message: 'Email Confirmed!' };
};
export const resendConfirmationLink = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User Not Found!');
  if (!user.emailConfirmationToken) throw new Error('Email Already Confirmed!');
  const token = uuidv4();
  user.emailConfirmationToken = token;
  await user.save();
  console.log(`[Email]: Confirm Account ${config.frontendUrls.emailConfirmation}/${token}`);
  return { message: 'Confirmation Link Sent!' };
};
export const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User Not Found!');
  const token = uuidv4();
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date(Date.now() + 3600000);
  await user.save();
  console.log(`[Email]: Reset Password ${config.frontendUrls.passwordReset}/${token}`);
  return { message: 'Reset Link Sent!' };
};
export const validateResetToken = async (token) => {
  const user = await User.findOne({ where: { passwordResetToken: token } });
  if (!user || new Date() > user.passwordResetExpires) return false;
  return true;
};
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ where: { passwordResetToken: token } });
  if (!user || new Date() > user.passwordResetExpires) throw new Error('Invalid or Expired Token');
  user.password = bcryptjs.hashSync(newPassword, 10);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();
  return { message: 'Password Reset Successful!' };
};