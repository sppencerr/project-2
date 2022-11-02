const { Post } = require('../models');

const postdata = [
  {
    title: 'blank title',
    note_text: 'blank text',
    user_id: 10
  }
];
const seedNotes = () => Post.bulkCreate(postdata);
module.exports = seedNotes;