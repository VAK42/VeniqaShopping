import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Tariff = sequelize.define('Tariff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  rates: { type: DataTypes.JSON }
});
export default Tariff;