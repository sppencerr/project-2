const router = require("express").Router();
const { Note, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

let Filter = require("bad-words"),
  filter = new Filter();

router.get("/", (req, res) => {
  console.log("-----------------------");
  Note.findAll({
    attributes: ["id", "note_text", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "note_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbNoteData) => res.json(dbNoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Note.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "note_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "note_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbNoteData) => {
      if (!dbNoteData) {
        res.status(404).json({ message: "No note found with this id" });
        return;
      }
      res.json(dbNoteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.note("/", withAuth, (req, res) => {
  Note.create({
    title: filter.clean(req.body.title),
    note_text: filter.clean(req.body.note_text),
    user_id: req.session.user_id,
  })
    .then((dbNoteData) => res.json(dbNoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Note.update(
    {
      title: filter.clean(req.body.title),
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbNoteData) => {
      if (!dbNoteData) {
        res.status(404).json({ message: "No note found with this id" });
        return;
      }
      res.json(dbNoteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Note.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbNoteData) => {
      if (!dbNoteData) {
        res.status(404).json({ message: "No note found with this id" });
        return;
      }
      res.json(dbNoteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
