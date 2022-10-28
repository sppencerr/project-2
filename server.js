// requirements
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); 
const exphbs = require('express-handlebars');
// const app = require('express');
const helpers = require('./utils/helper');
const hbs = exphbs.create({ helpers });
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionData = {
    secret: 'Super Ultra Secret',
    cookie: {},
    resave: false, 
    saveUnintialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

};
app.use(session(sessionData));
app.engine('handlebars', hbs.engine);

app.set(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is up and running 🚀 at ${PORT}!`))
})