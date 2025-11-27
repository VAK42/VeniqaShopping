import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  referralToken: { type: DataTypes.STRING, unique: true },
  emailConfirmationToken: { type: DataTypes.STRING },
  passwordResetToken: { type: DataTypes.STRING },
  passwordResetExpires: { type: DataTypes.DATE },
  addresses: { type: DataTypes.JSON, defaultValue: [] },
  cart: { type: DataTypes.JSON, defaultValue: { items: [], totalWeight: 0, subTotalPrice: 0 } }
});
export default User;