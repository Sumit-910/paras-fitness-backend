import { DataTypes } from 'sequelize';
import sequelize from '../db/index';

//User Model
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  profile_pic:{
    type: DataTypes.STRING(500),
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: false
});

export default User;