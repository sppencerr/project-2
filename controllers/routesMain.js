const router = require('express').Router();
const Note = require('../models/note');

//get all notes
router.get('/', async (req,res) =>{
    const noteData = await Note.findAll().catch((err) => {
        res.json(err);
    });
    const notes = noteData.map((note) => note.get
        ({ plain: true }));
        // ! send to dashboard? unsure of 'notes' below
        res.render('login', { notes }); 
    });


//get single note
router.get('/note/:id', async (req, res) => {
    try{ 
        const dishData = await Note.findByPk(req.params.id);
        if(!noteData) {
            res.status(404).json({message: 'No Note With that ID :('});
            return;
        }
        const note = noteData.get({ plain: true });
        res.render('note', note);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

module.exports = router;