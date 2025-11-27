import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  overallStatus: { type: DataTypes.STRING, defaultValue: 'RECEIVED' },
  cart: { type: DataTypes.JSON, allowNull: false },
  mailingAddress: { type: DataTypes.JSON, allowNull: false },
  paymentInfo: { type: DataTypes.JSON },
  comments: { type: DataTypes.JSON, defaultValue: [] },
  auditLog: { type: DataTypes.JSON }
});
export default Order;