import express, { Request, Response } from 'express';
import passport from "passport";
import AuthRoutes from './auth.route';
import session from 'express-session';

const app = express();
const port = process.env.PORT || 5000;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(passport.initialize());
app.use(passport.session());

app.use(AuthRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
