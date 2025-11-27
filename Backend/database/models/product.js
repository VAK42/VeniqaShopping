import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  store: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  itemUrl: { type: DataTypes.STRING, allowNull: false },
  storeSku: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.INTEGER },
  thumbnailUrls: { type: DataTypes.JSON, defaultValue: [] },
  featuredImageUrls: { type: DataTypes.JSON, defaultValue: [] },
  detailedImageUrls: { type: DataTypes.JSON, defaultValue: [] },
  markedPrice: { type: DataTypes.JSON },
  price: { type: DataTypes.JSON, allowNull: false },
  weight: { type: DataTypes.JSON, allowNull: false },
  tariff: { type: DataTypes.INTEGER },
  customizationOptions: { type: DataTypes.JSON },
  customAttributes: { type: DataTypes.JSON },
  detailsHtml: { type: DataTypes.TEXT },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  auditLog: { type: DataTypes.JSON }
});
export default Product;