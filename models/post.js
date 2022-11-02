const req = require('express/lib/request');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// post extends sequelize model
class Post extends Model {
    // static method (on model, not instance) to create votes on posts
    static upvote(body, models) {
        // create and return a vote record
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
            .then(() => {
                // then find and return the post with matching post_id
                return Post.findOne({
                    where: {
                        id: body.post_id
                    },
                    attributes: [
                        'id',
                        'post_title', 
                        'post_body', 
                        'created_at',
                        [sequelize.literal(`(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)`), 'vote_count']
                    ]
                });
            });
    }
}

Post.init(
    // column deinitions
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // options (timestamps defaults to true)
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;