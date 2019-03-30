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
  }

  res.render('login');
});

/*
 * Register page
 * /auth/register
 * Public
 * Get
 */
router.get('/register', (req, res) => {
  res.render('register');
});

/*
 * Logout page
 * /auth/logout
 * Private
 * Get
 */
module.exports = router;
