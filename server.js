/*
 * Import dependencies
 */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

/*
 * Import routes
 */
const root = require('./routes/root');
const auth = require('./routes/auth');

// Initialize app
const app = express();

/*
 * Handlebars middleware
 */
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

/*
 * Set static folder path
 * Set root route
 * Set authentication route
 */
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', root);
app.use('/auth', auth);

/*
 * Set port to 5000 if it's not defined in environment
 * Run and listen to the selected port
 */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started in TCP ${port}`);
});
