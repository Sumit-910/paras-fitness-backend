import { DataTypes } from 'sequelize';
import sequelize from '../db/index';
import User from './UserModel';

const FeedbackIssue = sequelize.define('FeedbackIssue', {
  issue_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    },
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('complete','pending','resolved'),
    allowNull: false,
  },
}, {
  tableName: 'feedback_issues',
  timestamps: false
});

export default FeedbackIssue;