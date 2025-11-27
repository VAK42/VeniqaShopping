import sequelize from '../connection.js';
import User from './user.js';
import Product from './product.js';
import Order from './order.js';
import Checkout from './checkout.js';
import Category from './category.js';
import Tariff from './tariff.js';
import FeaturedSection from './featuredSection.js';
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database Synced Successfully!');
  } catch (error) {
    console.error('Database Sync Failed!', error);
  }
};
export { sequelize, User, Product, Order, Checkout, Category, Tariff, FeaturedSection, syncDatabase };