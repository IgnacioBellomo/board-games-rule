const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const isLoggedIn    = require('../middleware');

/* GET home page */
router.post('/add-game', isLoggedIn, async (req, res, next) => {
  let newGameId = req.body.gameId;
  let theUser = await User.findById(req.user._id);
  if(!theUser.gamesList.includes(newGameId)){
    let updatedList = await User.findByIdAndUpdate({'_id': req.user._id}, {
      $push: { gamesList: newGameId }
    }, {'new': true});
    res.json({gameList: updatedList.gamesList});
  } else {
    res.status(500).json({ error: 'game is already on list' });
  }
});

router.post('/remove-game', isLoggedIn, async (req, res, next) => {
  let oldGameId = req.body.gameId;
  let theUser = await User.findById(req.user._id);
  if (theUser.gamesList.includes(oldGameId)){
      let updatedList = await User.findByIdAndUpdate(req.user._id, {
          $pull: { gamesList: oldGameId }
      }, {'new': true});
      res.json({gameList: updatedList.gamesList});
  } else {
    res.status(500).json({ error: 'game is not on list' });
  }
});

module.exports = router;
