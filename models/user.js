const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// user extends sequelize model
class User extends Model {
    // check password against db pass per user instance
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    // column definitions
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        // options
        hooks: {
            // before create, hash password so it never sees the db
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // before update pass, hash new pass so it never sees db
            async beforeUpdate(updatedUser) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;