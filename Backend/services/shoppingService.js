import { Product } from '../database/models/index.js';
const initCart = () => ({ items: [], totalWeight: { quantity: 0, unit: 'Lb' }, subTotalPrice: { amount: 0, currency: 'USD' } });
const calculateCart = async (items) => {
  let totalWeight = 0;
  let subTotal = 0;
  const calculatedItems = [];
  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product) continue;
    const weight = (product.weight?.quantity || 0) * item.counts;
    const price = (product.price?.amount || 0) * item.counts;
    totalWeight += weight;
    subTotal += price;
    calculatedItems.push({
      ...item,
      product,
      aggregatedWeight: { quantity: weight, unit: 'Lb' },
      aggregatedPrice: { amount: price, currency: 'USD' }
    });
  }
  return {
    items: calculatedItems,
    totalWeight: { quantity: totalWeight, unit: 'Lb' },
    subTotalPrice: { amount: subTotal, currency: 'USD' }
  };
};
export const addToCart = async (user, itemsToAdd) => {
  let cart = user.cart || initCart();
  for (const newItem of itemsToAdd) {
    const existingIndex = cart.items.findIndex(i => i.productId === newItem.product && JSON.stringify(i.customizations) === JSON.stringify(newItem.customizations));
    if (existingIndex > -1) {
      cart.items[existingIndex].counts += (newItem.counts || 1);
    } else {
      cart.items.push({ productId: newItem.product, counts: newItem.counts || 1, customizations: newItem.customizations });
    }
  }
  cart = await calculateCart(cart.items);
  user.cart = cart;
  user.changed('cart', true);
  await user.save();
  return cart;
};
export const updateCart = async (user, cartItems) => {
  let cart = user.cart || initCart();
  for (const item of cartItems) {
    const index = cart.items.findIndex(i => i.productId === item.product && JSON.stringify(i.customizations) === JSON.stringify(item.customizations));
    if (index > -1) {
      cart.items[index] = { ...cart.items[index], counts: item.counts };
    }
  }
  cart = await calculateCart(cart.items);
  user.cart = cart;
  user.changed('cart', true);
  await user.save();
  return cart;
};
export const getCart = async (user) => {
  if (!user.cart) return initCart();
  return await calculateCart(user.cart.items);
};
export const deleteFromCart = async (user, itemIds) => {
  let cart = user.cart || initCart();
  cart.items = cart.items.filter(i => !itemIds.includes(i.productId));
  cart = await calculateCart(cart.items);
  user.cart = cart;
  user.changed('cart', true);
  await user.save();
  return cart;
};