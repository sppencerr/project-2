const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// user has posts, each post belongs to a user
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// vote associations
// user can vote on many posts, through vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// post can have votes from many users, through vote
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// vote is from a user, FK user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// user can make many votes, fk user
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// vote is on one post, FK post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// post can have more than one vote, fk post
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Comment associations
// comment is by a user, FK user_id
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// comment is on a post, fk post_id
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// user can make many comments, fk user_id
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// posts can have more than one comment on it, fk post_id
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };