const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/signIn");
  } else {
    next();
  }
};

module.exports = withAuth;
