const router = require("express").Router();
const sequelize = require("../config/connection");
const { Note, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
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
    .then((dbnoteData) => {
      const notes = dbnoteData.map((note) => note.get({ plain: true }));

      res.render("homepage", {
        notes,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("error-500");
    });
});

router.get("/note/:id", (req, res) => {
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
    .then((dbnoteData) => {
      if (!dbnoteData) {
        res.render("error-404");
        return;
      }

      const note = dbnoteData.get({ plain: true });

      res.render("single-note", {
        note,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("error-500");
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
