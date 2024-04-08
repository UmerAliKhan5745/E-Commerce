// src/index.ts
import express, { Request, Response } from 'express';
import './config/dbs'
import cors from 'cors';
require('../src/middleware/passport-google-oauth1/googleOuth')
import passport from 'passport';
const app = express();
app.use(express.json())
require('./middleware/Jwt_passport/jwtPassport')
const port = 5000;
app.use(passport.initialize());
app.use(cors())
import session from 'express-session';

// Set up session middleware
app.use(
  session({
    secret: "omer",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
    
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/products'))
app.use('/api/payment',require('./routes/payment'))


// app.get(
//   "/api/auth/google", // Added leading slash
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );


  app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/pages/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect('/');
  });

app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});
