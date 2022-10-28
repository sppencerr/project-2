// ! --- Named "post.js" to "note.js" after the "notes" we'll be creating + to avoid HTTP "POST" terminology mix-ups or confusion

// TODO --- feel free to change back to "post", just be sure to update other references to it elsewhere

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ? Unsure about the "references" section
    gallery_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'note',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'note',
  }
);

module.exports = Note;
