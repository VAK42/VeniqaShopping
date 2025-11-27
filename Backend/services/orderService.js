import { Checkout, Order, Tariff, Product } from '../database/models/index.js';
import * as shoppingService from './shoppingService.js';
import { shippingRates } from '../data/shippingRates.js';
const calculateShippingPrice = (country, weight) => {
  const countryRates = shippingRates.find(r => r.country === country);
  if (!countryRates) return 15;
  const option = countryRates.shippingOptions[0];
  const weightCeil = Math.ceil(weight);
  return option.rates[weightCeil] || (option.rates[5] + (weightCeil - 5) * 5);
};
export const calculateFinalPrice = async (user, address) => {
  const cart = await shoppingService.getCart(user);
  let tariffTotal = 0;
  for (const item of cart.items) {
    const product = await Product.findByPk(item.productId);
    if (product && product.tariff) {
      const tariff = await Tariff.findByPk(product.tariff);
      const rate = (tariff && tariff.rates && tariff.rates[address.country]) ? tariff.rates[address.country] : 0;
      tariffTotal += (item.aggregatedPrice.amount * (rate / 100));
    }
  }
  const shippingPrice = calculateShippingPrice(address.country, cart.totalWeight.quantity);
  const serviceCharge = cart.subTotalPrice.amount * 0.05;
  const totalPrice = cart.subTotalPrice.amount + tariffTotal + shippingPrice + serviceCharge;
  return {
    ...cart,
    tariffPrice: { amount: parseFloat(tariffTotal.toFixed(2)), currency: 'USD' },
    shippingPrice: { amount: parseFloat(shippingPrice.toFixed(2)), currency: 'USD' },
    serviceCharge: { amount: parseFloat(serviceCharge.toFixed(2)), currency: 'USD' },
    totalPrice: { amount: parseFloat(totalPrice.toFixed(2)), currency: 'USD' }
  };
};
export const createCheckout = async (user, addressId) => {
  const address = user.addresses.find(a => a._id === addressId);
  if (!address) throw new Error('Address Not Found!');
  const cart = await calculateFinalPrice(user, address);
  if (!cart.items.length) throw new Error('Cart Empty!');
  await Checkout.destroy({ where: { userEmail: user.email } });
  return await Checkout.create({
    userEmail: user.email,
    cart,
    mailingAddress: address,
    paymentInfo: [],
    auditLog: { createdBy: user.email, createdOn: new Date() }
  });
};
export const isCheckoutValid = async (checkoutId, user) => {
  const checkout = await Checkout.findByPk(checkoutId);
  if (!checkout || checkout.userEmail !== user.email) return false;
  const currentCart = await calculateFinalPrice(user, checkout.mailingAddress);
  return Math.abs(currentCart.totalPrice.amount - checkout.cart.totalPrice.amount) < 0.01;
};
export const createPaymentToken = async (user, checkoutId, source) => {
  const checkout = await Checkout.findByPk(checkoutId);
  if (!checkout) throw new Error('Checkout Not Found!');
  const paymentInfo = {
    source,
    status: 'PENDING',
    amountInUsd: checkout.cart.totalPrice,
    amountInPaymentCurrency: checkout.cart.totalPrice,
    token: `MOCK_TOKEN_${Date.now()}`
  };
  checkout.paymentInfo = [paymentInfo];
  checkout.changed('paymentInfo', true);
  await checkout.save();
  return { checkoutId: checkout.id, paymentInfo };
};
export const stripePaymentInstant = async (user, checkoutId) => {
  const checkout = await Checkout.findByPk(checkoutId);
  if (!checkout) throw new Error('Checkout Not Found!');
  return { clientSecret: `MOCK_PI_${Date.now()}` };
};
const finalizeOrder = async (user, checkout, paymentDetails) => {
  const order = await Order.create({
    userEmail: user.email,
    cart: checkout.cart,
    mailingAddress: checkout.mailingAddress,
    paymentInfo: [paymentDetails],
    overallStatus: 'RECEIVED',
    auditLog: { createdOn: new Date() }
  });
  await checkout.destroy();
  user.cart = { items: [], totalWeight: 0, subTotalPrice: 0 };
  user.changed('cart', true);
  await user.save();
  console.log(`[Email]: Order Confirmation Sent To ${user.email}`);
  return order;
};
export const completeCheckout = async (user, checkoutId, paymentToken) => {
  const checkout = await Checkout.findByPk(checkoutId);
  if (!checkout) throw new Error('Checkout Not Found!');
  const isValid = await isCheckoutValid(checkoutId, user);
  if (!isValid) throw new Error('Checkout Invalid!');
  const paymentDetails = checkout.paymentInfo ? checkout.paymentInfo[0] : { source: 'UNKNOWN', amountInUsd: checkout.cart.totalPrice };
  paymentDetails.status = 'PAID';
  paymentDetails.transactionId = `TRANS_${Date.now()}`;
  return await finalizeOrder(user, checkout, paymentDetails);
};
export const completeCheckoutUsingCard = async (user, checkoutId, paymentToken) => {
  return await completeCheckout(user, checkoutId, paymentToken);
};
export const completeCheckoutUsingKhalti = async (user, checkoutId, paymentToken) => {
  const checkout = await Checkout.findByPk(checkoutId);
  if (!checkout) throw new Error('Checkout Not Found!');
  if (checkout.mailingAddress.country !== 'Nepal') throw new Error('Khalti Only Available For Nepal!');
  return await completeCheckout(user, checkoutId, paymentToken);
};
export const completeCheckoutUsingStripePaymentInstant = async (user, checkoutId, paymentToken) => {
  return await completeCheckout(user, checkoutId, paymentToken);
};