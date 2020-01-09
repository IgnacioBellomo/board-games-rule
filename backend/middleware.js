/*
Error Codes
1 - Not logged in
2 - 
*/
function isLoggedIn (req, res, next) {
    if (req.user) {
      return next();
    } else {
      return res.json({error: 1});
    }
}

module.exports = isLoggedIn;