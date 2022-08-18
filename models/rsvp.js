import { DataTypes } from "sequelize/types";
import sequelize from "../sequelize";

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