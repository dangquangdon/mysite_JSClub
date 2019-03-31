const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

/*
 * Login page
 * /auth/login
 * Public
 * Get
 */
router.get('/login', (req, res) => {
  /*
        If the user is already login, he/she cannot
        access to this login route again. But will be
        redirected to the landing page instead.
    */
  if (req.isAuthenticated()) {
    req.flash('error_message', 'You are already logged in');
    res.redirect('/');
  } else {
    res.render('login');
  }
});

/*
 * Login page
 * /auth/login
 * Public
 * Post
 */
/*
    When user sends post request to login,
    passport.authenticate method will be called,
    all of the credentials will be process in
    local strategy which is defined in /config/passport.js
*/
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    successRedirect: '/',
    failureRedirect: 'login'
  })
);

/*
 * Register page
 * /auth/register
 * Public
 * Get
 */
router.get('/register', (req, res) => {
  /*
        If the user is already login, he/she cannot
        access to this login route again. But will be
        redirected to the landing page instead.
    */
  if (req.isAuthenticated()) {
    req.flash('error_message', 'You are already logged in');
    res.redirect('/');
  } else {
    res.render('register');
  }
});

/*
 * Register page
 * /auth/register
 * Public
 * Post
 */
/*
    When user sends a post request to register,
    check all of the inputs to see if valid,
    then hash the password and store to database
*/
router.post('/register', (req, res) => {
  // Confirm Password Validation
  let errors = [];
  if (req.body.password != req.body.confirm_password) {
    errors.push({ text: 'Password does not match' });
  }
  // Password length validation
  if (req.body.password.length < 4) {
    errors.push({
      text: 'Password must be at least 4 characters'
    });
  }

  // Check errors
  if (errors.length > 0) {
    res.render('register', {
      errors: errors,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      handle: req.body.handle,
      email: req.body.email
    });
  } else {
    // If check if handle name is existed
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(req.body.password, salt);

    const new_user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      handle: req.body.handle,
      email: req.body.email,
      password: hashed_password
    });

    // Store new user to database
    new_user
      .save()
      .then(user => {
        req.flash(
          'success_message',
          'Thank you for registering, enjoy your time'
        );
        res.redirect('login');
      })
      .catch(err => {
        // Validate email and handle name
        if (err.code == 11000) {
          let errors = [];
          errors.push({
            text: 'Email or Handle name is existed, please choose another one'
          });
          res.render('register', {
            name: req.body.name,
            handle: req.body.handle,
            email: req.body.email,
            errors: errors
          });
        } else {
          console.log(err);
        }
      });
  }
});
/*
 * Logout page
 * /auth/logout
 * Private
 * Get
 */
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_message', 'Logged out, see you again');
  res.redirect('/auth/login');
});

module.exports = router;
