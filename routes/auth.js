const express = require('express');
const router = express.Router();

/*
 * Login page
 * /auth/login
 * Public
 * Get
 */
router.get('/login', (req, res) => {
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
