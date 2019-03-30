const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../helpers/authHelpers');
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
    Portfolio.find({ user: req.user._id })
      .sort({ date: 'desc' })
      .then(portfolio => {
        if (!portfolio[0]) {
          console.log('no portfolio');
          res.render('portfolio');
        } else {
          console.log(portfolio);
          res.render('portfolio', {
            portfolio: portfolio
          });
        }
      });
  }
});

/*
 * Add project to portfolio
 * /portfolio/create-portfolio
 * Private
 * GET
 */

router.get('/create-portfolio', isAuthorized, (req, res) => {
  res.render('create_portfolio');
});

/*
 * POST
 */
router.post('/create-portfolio', isAuthorized, (req, res) => {
  const new_project = {
    user: req.user.id,
    title: req.body.title,
    link_demo: req.body.link_demo,
    link_github: req.body.link_github,
    description: req.body.description
  };
  new Portfolio(new_project)
    .save()
    .then(portfolio => {
      req.flash('success_message', 'New project is added');
      res.redirect('/portfolio');
    })
    .catch(err => console.log(err));
});

module.exports = router;
