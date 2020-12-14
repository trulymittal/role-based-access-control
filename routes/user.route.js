const router = require('express').Router();

router.get('/profile', async (req, res, next) => {
  res.render('profile');
});

module.exports = router;
