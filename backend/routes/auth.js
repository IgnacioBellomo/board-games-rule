const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const isLoggedIn    = require('../middleware');


router.post('/signup', (req, res, next) => {
  
  User.register(req.body, req.body.password)
    .then((user) => { 
        req.login(user, function(err,result){
          res.status(201).json(user)
        })
    })
    .catch((err) => { 
      res.status(500).json({ err })
    });
});

router.post('/change-password', isLoggedIn, (req, res, next) => {
  let theResponse = {message: ""};
  User.findById(req.user._id) 
  .then(foundUser => {
      foundUser.changePassword(req.body.oldPassword, req.body.newPassword)
          .then(() => {
              console.log('password changed');
              theResponse.message = 'success';
              res.json(theResponse);
          })
          .catch((error) => {
              console.log('31 ', error.message);
              theResponse.message = 'incorrect';
              res.json(theResponse);
          })
  })
  .catch((error) => {
      console.log('36 ', error);
      theResponse.message = 'error 2'
      res.json(theResponse);
  });
});

// Checks db to see if email is taken during registration
router.post('/validEmail', (req, res, next) => {
  let email = req.body.email;
  console.log(email);
    User.findOne({"email": email})
    .then((user) => {
      console.log(user)
        if (!user) {
            res.json({
                free: true
              });
            return;
        } else {
          res.json({
            free: false
          });
          return;
        }
    })
    .catch(error => {
      res.json({
        error: error
      })
    })
})

router.post('/update-profile', isLoggedIn, async (req, res, next) => {
  let response;
  console.log('49 ', req.body);
  if (req.body.firstName){
    response = await User.findByIdAndUpdate(req.user._id, {firstName: req.body.firstName, lastName: req.body.lastName})
  } else if (req.body.email){
    console.log(req.body.email);
    response = await User.findByIdAndUpdate(req.user._id, {email: req.body.email});
  }
  res.json(response);
})


//return await service.get('/is-logged-in');
router.get('/is-logged-in', isLoggedIn, async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('movieList.movie')
    .populate('movieList.review')
    .populate('friends')
    .populate('requests.user')
    .populate('feed.review')
  res.json(user);
})


router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('movieList.movie')
    .populate('movieList.review')
    .populate('friends')
    .populate('requests.user')
    .populate('feed.review')
    // .populate('showList.movie')
    // .populate('showList.review')
  res.status(200).json(user);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
