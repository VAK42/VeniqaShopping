import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING },
  subcategory: { type: DataTypes.STRING }
});
export default Category;