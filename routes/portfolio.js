const express = require('express');
const router = express.Router();

// Import Portfolio model
const Portfolio = require('../models/Portfolio');

/*
 * Portfolio page
 * /portfolio
 * Public
 * Get
 */
/*
    Check if there is an user, if not render template normally,
    or else, find all portfolios in the database that has userID
    the same as current user id

*/
router.get('/', (req, res) => {
  if (req.user == null) {
    res.render('portfolio');
  } else {
    Portfolio.find({ user: req.user.id })
      .sort({ date: 'desc' })
      .then(portfolio => {
        const isOwner = portfolio[0].user == req.user.id;
        res.render('portfolio', {
          portfolio: portfolio,
          isOwner: isOwner
        });
      });
  }
});

module.exports = router;
