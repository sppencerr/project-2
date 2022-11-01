
const Note = require('./note');
const User = require('./user');
const Comment = require('./comment');

User.hasMany(Note, {
    foreignKey: 'user_id'
});

Note.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Note, {
    foreignKey: 'note_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Note.hasMany(Comment, {
    foreignKey: 'note_id'
});

module.exports = { User, Note, Comment };