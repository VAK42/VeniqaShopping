import * as authService from '../services/authService.js';
export const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (e) { res.status(401).json({ error: e.message }); }
};
export const confirmEmail = async (req, res) => {
  try {
    const result = await authService.confirmEmail(req.params.token);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const resendConfirmation = async (req, res) => {
  try {
    const result = await authService.resendConfirmationLink(req.query.email);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.query.email);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const validateResetToken = async (req, res) => {
  try {
    const isValid = await authService.validateResetToken(req.params.token);
    res.status(200).json({ isValid });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.newPassword);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const isSessionActive = async (req, res) => {
  res.status(200).json({ user: req.user, status: 'Active' });
};