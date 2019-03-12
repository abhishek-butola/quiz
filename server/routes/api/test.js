const passport = require('passport');
const express = require('express');
const router = express.Router();

//@route GET api/demo/public
//@desc Test Profile route
//@access PUBLIC
router.get('/public', (req, res) => {
  res.json({ msg: 'Public route' });
});

//@route GET api/demo/private
//@desc Test Profile route
//@access Private

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'Protected route' });
  }
);

module.exports = router;
