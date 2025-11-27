import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const FeaturedSection = sequelize.define('FeaturedSection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  content: { type: DataTypes.JSON }
});
export default FeaturedSection;