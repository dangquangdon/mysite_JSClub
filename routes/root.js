const express = require('express');
const router = express.Router();

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
 * Portfolio page
 * /portfolio
 * Public
 * Get
 */
router.get('/portfolio', (req, res) => {
  res.render('portfolio');
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
 * export router
 * always at the bottom
 */
module.exports = router;
