const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const routes = require('./routes/index');

const port = process.env.PORT || 3000;

// app.use(cors());

app.use('/auth', routes.authRouter);
app.use('/user', routes.userRouter);
app.use('/blog', routes.blogRouter);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);