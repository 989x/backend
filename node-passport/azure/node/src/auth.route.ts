import express from 'express';
import passport from 'passport';
import { initPassport } from './passport.config';
initPassport();

const router = express.Router();

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

router.get('/login', passport.authenticate('azuread-openidconnect'));

router.get('/logout', function (req: any, res, next) {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect(process.env.APPLICATION_URL as string);
    });
  });
});

router.post(
  '/auth/callback',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/auth-failure',
  }),
  regenerateSessionAfterAuthentication,
  function (req, res) {
    res.redirect(`${process.env.APPLICATION_URL}`);
  }
);

router.get('/auth-success', (req, res) => {
  const token = (req?.user as any)?._json?.email;
  const name = (req?.user as any)?._json?.given_name;
  res.redirect(`${process.env.APPLICATION_URL}`);
});

router.get('/auth-failure', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

router.get('/getLoggedInUser', (req: any, res) => {
  if (req.session.passport) {
    res.json({
      username: req.session.passport.user?.displayName,
      email: req.session.passport.user?._json?.email,
    });
  } else {
    res.json({ username: null, email: null });
  }
});

function regenerateSessionAfterAuthentication(req: any, res: any, next: any) {
  var passportInstance = req.session.passport;
  return req.session.regenerate((err: Error) => {
    if (err) {
      return next(err);
    }
    req.session.passport = passportInstance;
    req.session.isAuthenticated = true;
    return req.session.save(next);
  });
}

export default router;
