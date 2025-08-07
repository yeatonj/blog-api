const express = require('express');

// Setup app
const app = express();

// App will serve JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use .env file
require('dotenv').config();

// Setup passport for login and tokens
const passport = require("passport");
require('./auth/passportLocal');
require('./auth/passportJWT');

// Load routes
const routes = require('./routes/index');

const port = process.env.PORT || 3000;

// app.use(cors());

app.use('/auth', routes.authRouter);
app.use('/user', routes.userRouter);
app.use('/blog', routes.blogRouter);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);