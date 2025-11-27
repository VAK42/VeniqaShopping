import * as userService from '../services/userService.js';
export const addAddress = async (req, res) => {
  try {
    const result = await userService.addAddress(req.user, req.body);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getAddresses = async (req, res) => {
  res.status(200).json(userService.getAddresses(req.user));
};
export const updateAddress = async (req, res) => {
  try {
    const result = await userService.updateAddress(req.user, req.body);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const deleteAddress = async (req, res) => {
  try {
    const result = await userService.deleteAddress(req.user, req.body.addressId);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getOrderList = async (req, res) => {
  try {
    const { pagingOptions, sortRule } = req.body;
    const result = await userService.getOrderList(req.user, pagingOptions, sortRule);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getOrderDetails = async (req, res) => {
  try {
    const result = await userService.getOrderDetails(req.user, req.query.orderId);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};