const express = require('express');
const router = express.Router();

const User = require('../models/User');
/*
 * Landing page
 * root
 * Public
 * Get
 */
router.get('/', (req, res) => {
  res.render('home', { nofooter: true });
});

/*
 * About page
 * /about
 * Public
 * Get
 */
router.get('/about', (req, res) => {
  res.render('about');
});

/*
 * About page of a user
 * /:handle/about
 * Public
 * Get
 */
router.get('/:handle/about', (req, res) => {
  User.findOne({ handle: req.params.handle })
    .then(user => {
      if (user) {
        res.render('about', { handle_user: user });
      } else {
        req.flash('error_message', 'This user does not exist');
        res.redirect('/about');
      }
    })
    .catch(err => console.log(err));
});
/*
 * Contact page
 * /contact
 * Public
 * Get
 */
router.get('/contact', (req, res) => {
  res.render('contact');
});

/*
      TO DO:
        * Show user's information by hanle
        * Home, Portfolio, Contact
 */
module.exports = router;
