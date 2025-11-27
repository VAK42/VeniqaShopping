import { Order } from '../database/models/index.js';
import { v4 as uuidv4 } from 'uuid';
export const addAddress = async (user, addressData) => {
  const addresses = user.addresses || [];
  const newAddress = { ...addressData, _id: uuidv4() };
  addresses.push(newAddress);
  user.addresses = addresses;
  user.changed('addresses', true);
  await user.save();
  return addresses;
};
export const getAddresses = (user) => user.addresses || [];
export const updateAddress = async (user, addressData) => {
  let addresses = user.addresses || [];
  const index = addresses.findIndex(a => a._id === addressData._id);
  if (index === -1) throw new Error('Address Not Found!');
  addresses[index] = addressData;
  user.addresses = addresses;
  user.changed('addresses', true);
  await user.save();
  return addresses;
};
export const deleteAddress = async (user, addressId) => {
  let addresses = user.addresses || [];
  addresses = addresses.filter(a => a._id !== addressId);
  user.addresses = addresses;
  user.changed('addresses', true);
  await user.save();
  return addresses;
};
export const getOrderList = async (user, pagingOptions = { limit: 10, page: 1 }, sortRule) => {
  const limit = parseInt(pagingOptions.limit) || 10;
  const offset = ((parseInt(pagingOptions.page) || 1) - 1) * limit;
  const orders = await Order.findAndCountAll({
    where: { userEmail: user.email },
    limit,
    offset,
    order: [['createdAt', sortRule?.includes('-') ? 'DESC' : 'ASC']]
  });
  return { docs: orders.rows, total: orders.count, limit, page: pagingOptions.page };
};
export const getOrderDetails = async (user, orderId) => {
  return await Order.findOne({ where: { id: orderId, userEmail: user.email } });
};