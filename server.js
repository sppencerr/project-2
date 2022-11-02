// Required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// Required files
const routes = require('./controllers');
const helpers = require('./utils/helper');
const sequelize = require('./config/connection');

// Setup sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setup express and server port
const app = express();
const PORT = process.env.PORT || 3001;

// Direct handlebars to helper files
const hbs = exphbs.create({ helpers });

// Session parameters
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		// maxAge: 150000,
		// httpOnly: true,
		// secure: false,
		// sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

// Use the session
app.use(session(sess));

// Connect express and handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup static path to public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);

// Sequelize and server listening
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Server is up and running 🚀 at ${PORT}!`));
});
