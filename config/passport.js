const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email: email }).then(user => {
          if (!user) {
            return done(
              null,
              false,
              req.flash('error_message', 'No user found for this email')
            );
          }

          // Check passpord
          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(
                  null,
                  false,
                  req.flash('error_message', 'Password incorrect')
                );
              }
            })
            .catch(err => console.log(err));
        });
      }
    )
  );
  //   Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
