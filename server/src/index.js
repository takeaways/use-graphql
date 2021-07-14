const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const morgan = require('morgan');
// const messagesRoute = require('./routes/messages');
// const usersRoute = require('./routes/users');

const schema = require('./schema');
const resolvers = require('./resolvers');
const { readDB } = require('./dbController');

const app = express();
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(
  cors({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    credentials: true,
  }),
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    db: {
      messages: readDB('messages'),
      users: readDB('users'),
    },
  },
});

// app.use('/messages', messagesRoute);
// app.use('/users', usersRoute);

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
});

app.listen(8000, () => {
  console.log('server start on port 8000');
});
