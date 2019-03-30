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
          res.render('portfolio');
        } else {
          console.log(res.locals.current_user);
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

/*
 * Edit a project
 * /portfolio/edit/:id
 * Private
 * GET
 */

/*
    Go to edit form to edit an existing project.
    But first have to check if the current user
    is the owner of the project.
    The same handlebars form as creating project
    can be used.
 */
router.get('/edit/:id', isAuthorized, (req, res) => {
  Portfolio.findOne({ _id: req.params.id })
    .then(project => {
      if (project.user != req.user.id) {
        req.flash('error_message', 'Not authorized');
        res.redirect('/portfolio');
      } else {
        res.render('create_portfolio', { project: project });
      }
    })
    .catch(err => console.log(err));
});

/*
  PUT - Edit project
*/
router.put('/edit/:id', isAuthorized, (req, res) => {
  Portfolio.findOne({ _id: req.params.id }).then(project => {
    // new values
    project.title = req.body.title;
    project.link = req.body.link;
    project.description = req.body.description;

    project.save().then(project => {
      req.flash('success_message', 'Updated');
      res.redirect('/portfolio');
    });
  });
});

/*
 * Edit a project
 * /portfolio/delete/:id
 * Private
 * DELETE - Delete project by its id
 */

router.delete('/delete/:id', isAuthorized, (req, res) => {
  Portfolio.findOneAndDelete({ _id: req.params.id }).then(() => {
    req.flash('success_message', 'Project is deleted');
    res.redirect('/portfolio');
  });
});

module.exports = router;
