const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { isAuthorized } = require('../helpers/authHelpers');

/*
 * Update Profile page
 * /user/update-profile
 * Private
 * GET
 */
/*
    Get the authorized user and current data and show them in the form.
*/
router.get('/update-profile', isAuthorized, (req, res) => {
  user_skills = req.user.skills.join();
  res.render('update_profile', {
    name: req.user.name,
    email: req.user.email,
    skills: user_skills,
    skills_description: req.user.skills_description,
    github_account: req.user.github_account,
    facebook: req.user.facebook,
    twitter: req.user.twitter,
    linkedin: req.user.linkedin
  });
});

/*
 * Update Profile page
 * /user/update-profile
 * Private
 * PUT
 */
/*
    Update user's data with the data received from the form
*/
router.put('/update-profile', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      if (req.body.skills) {
        user.skills = req.body.skills.split(',');
      }

      user.name = req.body.name;
      user.email = req.body.email;
      user.skills_description = req.body.skills_description;
      user.github_account = req.body.github_account;
      user.linkedin = req.body.linkedin;
      user.facebook = req.body.facebook;
      user.twitter = req.body.twitter;

      // save to database
      user
        .save()
        .then(user => {
          req.flash('success_message', 'Updated successfully');
          res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

/*
 * Add education
 * /user/update-education
 * Private
 * GET
 */

router.get('/update-education', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      res.render('update_education', { id: user._id });
    })
    .catch(err => console.log(err));
});

// POST - Add/Update education form
router.post('/update-education', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const school = {
        school: req.body.school,
        degree: req.body.degree,
        year: req.body.year
      };

      user.education.unshift(school);
      user.education_description = req.body.education_description;

      user
        .save()
        .then(user => {
          req.flash('success_message', 'Add education infomation successfully');
          res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

/*
 * Add workexp
 * /user/update-workexp
 * Private
 * GET
 */

router.get('/update-workexp', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      res.render('update_workexp', { id: user._id });
    })
    .catch(err => console.log(err));
});

// POST - Add/Update workexp form
router.post('/update-workexp', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const company = {
        company: req.body.company,
        title: req.body.title,
        year: req.body.year
      };

      user.workexp.unshift(company);
      user
        .save()
        .then(user => {
          req.flash(
            'success_message',
            'Add work experience infomation successfully'
          );
          res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

/*
    TO DO:
            * Add and Delete Education by id
            * Add and Delete Work EXP by id
 */
module.exports = router;
