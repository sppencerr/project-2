const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'topic',
  }
);

module.exports = Topic;