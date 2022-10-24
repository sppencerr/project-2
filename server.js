const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// TODO placeholder for helpers
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// ?confirm cookie settings: "httpOnly" vs "secure" for higher security. also "resave" vs "saveUnititialized".
const sess = {
    secret: 'TBD',
    cookie: {
      maxAge: 150_000,
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// TODO adding sequelize placeholders
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });