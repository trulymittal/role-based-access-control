const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');

router.get('/login', async (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  res.send('Login post');
});

router.get('/register', async (req, res, next) => {
  res.render('register');
});

router.post(
  '/register',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be a valid email')
      .normalizeEmail()
      .toLowerCase(),
    body('password')
      .trim()
      .isLength(2)
      .withMessage('Password length short, min 2 char required'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password do not match');
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('register', {
          email: req.body.email,
          messages: req.flash(),
        });
        return;
      }

      const { email } = req.body;
      const doesExist = await User.findOne({ email });
      if (doesExist) {
        res.redirect('/auth/register');
        return;
      }
      const user = new User(req.body);
      await user.save();
      req.flash(
        'success',
        `${user.email} registered succesfully, you can now login`
      );
      res.redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }
);

router.get('/logout', async (req, res, next) => {
  res.send('logout');
});

module.exports = router;
