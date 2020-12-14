const router = require('express').Router();

router.get('/login', async (req, res, next) => {
  res.render('login');
});

router.get('/register', async (req, res, next) => {
  res.render('register');
});

router.post('/login', async (req, res, next) => {
  res.send('Login post');
});

router.post('/register', async (req, res, next) => {
  res.send('register post');
});

router.get('/logout', async (req, res, next) => {
  res.send('logout');
});

module.exports = router;
