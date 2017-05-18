// helper function to check if user is currently logged in
// adapted from SO article: http://stackoverflow.com/questions/14188834/documentation-for-ensureauthentication-isauthenticated-passports-functions
module.exports = function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
};
