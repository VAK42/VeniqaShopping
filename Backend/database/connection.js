import { Sequelize } from 'sequelize';
import config from '../config/config.js';
const sequelize = new Sequelize({
  dialect: config.database.dialect,
  storage: config.database.storage,
  logging: msg => console.log(`[Database]: ${msg}`)
});
export default sequelize;