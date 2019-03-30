module.exports = {
  isAuthorized: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('error_message', 'Not authorized');
      res.redirect('/auth/login');
    }
  }
};
