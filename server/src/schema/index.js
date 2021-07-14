const { gql } = require('apollo-server-express');
const messageSchema = require('./message');
const userSchema = require('./user');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, messageSchema, userSchema];
