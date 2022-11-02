// TODO --- copied over template, left in bcrypt components in the event that we'd like to implement
// TODO --- bcrypt as our "new technology or library" feature rather than Tailwind

const { Model, DataTypes } = require("sequelize");
// const bcrypt = require('bcrypt');
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) 
  {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    // hooks: 
    // ? Should we use "bcrypt" for encryption
    // {
    //   async beforeCreate(newUserData) {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
