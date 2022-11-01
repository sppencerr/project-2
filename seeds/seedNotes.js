const { Note } = require('../models');

const notedata = [
  {
    title: 'blank title',
    note_text: 'blank text',
    user_id: 10
  }
];
const seedNotes = () => Note.bulkCreate(notedata);
module.exports = seedNotes;