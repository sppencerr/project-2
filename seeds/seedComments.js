const { Comment } = require('../models');

const commentdata = [
  { comment_text: 'Blank comment',
    user_id: 2,
    note_id: 2
}
];
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;