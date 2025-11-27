import * as orderService from '../services/orderService.js';
export const createCheckout = async (req, res) => {
  try {
    const result = await orderService.createCheckout(req.user, req.body.addressId);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const isCheckoutValid = async (req, res) => {
  try {
    const result = await orderService.isCheckoutValid(req.query.checkoutId, req.user);
    res.status(200).json({ isValid: result });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const createPaymentToken = async (req, res) => {
  try {
    const result = await orderService.createPaymentToken(req.user, req.body.checkoutId, req.body.paymentSource);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const completeCheckout = async (req, res) => {
  try {
    const result = await orderService.completeCheckout(req.user, req.body.checkoutId, req.body.paymentToken);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const stripePaymentInstant = async (req, res) => {
  try {
    const result = await orderService.stripePaymentInstant(req.user, req.body.checkoutId);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const completeCheckoutUsingCard = async (req, res) => {
  try {
    const result = await orderService.completeCheckoutUsingCard(req.user, req.body.checkoutId, req.body.paymentToken);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const completeCheckoutUsingKhalti = async (req, res) => {
  try {
    const result = await orderService.completeCheckoutUsingKhalti(req.user, req.body.checkoutId, req.body.paymentToken);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const completeCheckoutUsingStripePaymentInstant = async (req, res) => {
  try {
    const result = await orderService.completeCheckoutUsingStripePaymentInstant(req.user, req.body.checkoutId, req.body.paymentToken);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};