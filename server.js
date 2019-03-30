/*
 * Import dependencies
 */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverrid = require('method-override');

/*
 * Import routes
 * Import keys
 * Import models
 */
const root = require('./routes/root');
const auth = require('./routes/auth');
const portfolio = require('./routes/portfolio');
const user = require('./routes/user');

const keys = require('./config/keys');

// Initialize app
const app = express();

/*
 * Express Session middleware
 * Connect Flash middleware
 */
app.use(
  session({
    secret: keys.secretKey,
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

/*
 * Initialize local strategy
 * Passport middlewares
 */
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

/*
 * Handlebars middleware
 */
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

/*
 * bodyParser middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Method override middleware
 */
app.use(methodOverrid('_method'));

/*
 * connect to MongoDB URI
 */
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(err => console.log(err));

/*
 * Custom middleware
 * to set global variables
 */
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.errors = req.flash('errors');
  res.locals.current_user = req.user || null;
  next();
});

/*
 * Set static folder path
 * Set root routes
 * Set authentication routes
 * Set portfolio routes
 */
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', root);
app.use('/auth', auth);
app.use('/portfolio', portfolio);
app.use('/user', user);

/*
 * Set port to 5000 if it's not defined in environment
 * Run and listen to the selected port
 */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started in TCP ${port}`);
});
