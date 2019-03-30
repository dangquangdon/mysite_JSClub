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

module.exports = router;
