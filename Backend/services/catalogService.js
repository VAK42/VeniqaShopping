import { Product, Category } from '../database/models/index.js';
export const searchCatalog = async (searchTerm, categoryIds, limit = 20, offset = 0) => {
  const where = { active: true };
  if (categoryIds && categoryIds.length > 0) where.category = categoryIds;
  return await Product.findAndCountAll({ where, limit, offset });
};
export const getProductDetails = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product Not Found!');
  return product;
};