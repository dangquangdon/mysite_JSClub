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
 * Contact page
 * /contact
 * Public
 * Get
 */
router.get('/contact', (req, res) => {
  res.render('contact');
});

/*
 * Landing page of a user
 * /:handle
 * Public
 * Get
 */
router.get('/home/:handle', (req, res) => {
  User.findOne({ handle: req.params.handle })
    .then(user => {
      if (user) {
        res.render('home', { nofooter: true, handle_user: user });
      } else {
        req.flash('error_message', 'This user does not exist');
        res.redirect('/');
      }
    })
    .catch(err => console.log(err));
});

/*
 * About page of a user
 * /:handle/about
 * Public
 * Get
 */
router.get('/about/:handle', (req, res) => {
  User.findOne({ handle: req.params.handle })
    .then(user => {
      if (user) {
        res.render('about', { handle_user: user });
      } else {
        req.flash('error_message', 'This user does not exist');
        res.redirect('/');
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
router.get('/contact/:handle', (req, res) => {
  User.findOne({ handle: req.params.handle })
    .then(user => {
      if (user) {
        res.render('contact', { handle_user: user });
      } else {
        req.flash('error_message', 'This user does not exist');
        res.redirect('/');
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
