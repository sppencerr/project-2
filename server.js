// import packages
const express = require("express");
const path = require("path");
const exhbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const app = express();
const PORT = process.env.PORT || 3306;
const sess = {
  secret: "super duper secret shhh",
  cookie: {
    maxAge: 15 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// middleware
const hbs = exhbs.create({ helpers });
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// turn on routes
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
