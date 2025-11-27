import { FeaturedSection, Category } from '../database/models/index.js';
export const getFeaturedSection = async (name) => {
  return await FeaturedSection.findOne({ where: { name } });
};
export const getProductCategoryList = async () => {
  return await Category.findAll();
};