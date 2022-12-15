const { Sequelize, DataTypes } = require("sequelize");

const host = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host,
  dialect: 'mysql',
});

const Rsvp = sequelize.define('rsvp', {
  guest_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attending: {
    type: DataTypes.BOOLEAN,
  },
  meal: {
    type: DataTypes.INTEGER
  }
}, {timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at'});

module.exports = {
  Rsvp,
  sequelize
};
