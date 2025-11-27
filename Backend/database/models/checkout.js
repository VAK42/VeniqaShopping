import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Checkout = sequelize.define('Checkout', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  cart: { type: DataTypes.JSON, allowNull: false },
  mailingAddress: { type: DataTypes.JSON, allowNull: false },
  paymentInfo: { type: DataTypes.JSON },
  status: { type: DataTypes.STRING, defaultValue: 'PENDING' },
  auditLog: { type: DataTypes.JSON }
});
export default Checkout;