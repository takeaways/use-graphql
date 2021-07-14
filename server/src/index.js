const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const messagesRoute = require('./routes/messages');
const usersRoute = require('./routes/users');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/messages', messagesRoute);
app.use('/users', usersRoute);

app.listen(8000, () => {
  console.log('server start on port 8000');
});
