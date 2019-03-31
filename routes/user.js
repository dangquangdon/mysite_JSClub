const express = require('express');
const router = express.Router();
const uuid4 = require('uuid/v4');
const multer = require('multer');
const path = require('path');

const User = require('../models/User');
const { isAuthorized } = require('../helpers/authHelpers');
const { checkFileType } = require('../helpers/fileUpload');
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
 * Education
 * /user/update-education
 * Private
 * GET
 */

router.get('/update-education', isAuthorized, (req, res) => {
  res.render('update_education');
});

// POST - Add education form
router.post('/update-education', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const school = {
        school: req.body.school,
        degree: req.body.degree,
        year: req.body.year
      };

      user.education.unshift(school);

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

// GET - Get education by id
router.get('/edit-education/:id', isAuthorized, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = user.education.map(item => item.id).indexOf(req.params.id);
      if (index > -1) {
        education = user.education[index];
        res.render('update_education', { education: education });
      } else {
        req.flash('error_message', 'This info does not exist');
        res.redirect('/about');
      }
    })
    .catch(err => console.log(err));
});

// PUT - Edit education
router.put('/edit-education/:id', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const index = user.education.map(item => item.id).indexOf(req.params.id);
      if (index > -1) {
        user.education[index].school = req.body.school;
        user.education[index].degree = req.body.degree;
        user.education[index].year = req.body.year;
      }

      user.save().then(user => {
        req.flash('success_message', 'Updated');
        res.redirect('/about');
      });
    })
    .catch(err => console.log(err));
});

// DELETE - Delete education
router.delete('/delete-education/:id', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const removeIndex = user.education
        .map(item => item.id)
        .indexOf(req.params.id);
      if (removeIndex > -1) {
        user.education.splice(removeIndex, 1);
      }

      user.save().then(user => {
        req.flash('success_message', 'Deleted');
        res.redirect('/about');
      });
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

// GET - Get workexp by id
router.get('/edit-workexp/:id', isAuthorized, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = user.workexp.map(item => item.id).indexOf(req.params.id);
      if (index > -1) {
        res.render('update_workexp', { workexp: user.workexp[index] });
      } else {
        req.flash('error_message', 'This info does not exist');
        res.redirect('/about');
      }
    })
    .catch(err => console.log(err));
});

// GET - Get workexp by id
router.put('/edit-workexp/:id', isAuthorized, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = user.workexp.map(item => item.id).indexOf(req.params.id);
      if (index > -1) {
        user.workexp[index].company = req.body.company;
        user.workexp[index].title = req.body.title;
        user.workexp[index].year = req.body.year;

        user.save().then(user => {
          req.flash('success_message', 'Updated');
          res.redirect('/about');
        });
      } else {
        req.flash('error_message', 'This info does not exist');
        res.redirect('/about');
      }
    })
    .catch(err => console.log(err));
});

// DELETE - Delete workexp
router.delete('/delete-workexp/:id', isAuthorized, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      const removeIndex = user.workexp
        .map(item => item.id)
        .indexOf(req.params.id);
      if (removeIndex > -1) {
        user.workexp.splice(removeIndex, 1);
      }

      user.save().then(user => {
        req.flash('success_message', 'Deleted');
        res.redirect('/about');
      });
    })
    .catch(err => console.log(err));
});

/*
 * Upload avatar pictures
 * Setup storage and file validations
 */
// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: './public/images/avatars',
  filename: (req, file, callback) => {
    callback(null, uuid4() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,

  limits: { fileSize: 1000000 }, //1Mb
  fileFilter: (req, file, done) => {
    checkFileType(file, done);
  }
}).single('avatar');

// GET - Upload picture
router.get('/upload-avatar', isAuthorized, (req, res) => {
  User.findById({ _id: req.user.id }).then(user => {
    res.render('upload_picture', { user: user });
  });
});

// POST - Upload avatar
router.post('/upload-avatar', isAuthorized, (req, res) => {
  User.findById({ _id: req.user.id })
    .then(user => {
      upload(req, res, err => {
        if (err) {
          req.flash('error_message', err.message);
          res.redirect('/');
        } else {
          user.avatar = `avatars/${req.file.filename}`;
          user.save().then(user => {
            req.flash('success_message', 'Image updated');
            res.redirect('/');
          });
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
