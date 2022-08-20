import { Sequelize, DataTypes } from "sequelize";

const host = 'wedding-rsvp-database.c3xugced8cg2.us-east-1.rds.amazonaws.com';
const dbUser = 'admin';
const dbPassword = 'ALdsm&$MP#QAGor6';
const dbName = 'wedding';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host,
  dialect: 'mysql',
});

const Rsvp = sequelize.define('Rsvp', {
  id: {
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
  }
});

export default Rsvp;
