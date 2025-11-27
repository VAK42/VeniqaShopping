import * as shoppingService from '../services/shoppingService.js';
export const addToCart = async (req, res) => {
  try {
    const result = await shoppingService.addToCart(req.user, req.body);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const updateCart = async (req, res) => {
  try {
    const result = await shoppingService.updateCart(req.user, req.body.cartItems);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getCart = async (req, res) => {
  try {
    const result = await shoppingService.getCart(req.user);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const deleteFromCart = async (req, res) => {
  try {
    const result = await shoppingService.deleteFromCart(req.user, req.body.cartItemIds);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};