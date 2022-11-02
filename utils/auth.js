// lock routes to logged in users only
function withAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    // logged in, so send to next middleware
    next();
  }
}

module.exports = withAuth;
