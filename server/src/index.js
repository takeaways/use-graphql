const express = require('express');
const cors = require('cors');
const messagesRoute = require('./routes/messages');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

messagesRoute.forEach(({ method, handler, route }) => {
  app[method](route, handler);
});

app.listen(8000, () => {
  console.log('server start on port 8000');
});
