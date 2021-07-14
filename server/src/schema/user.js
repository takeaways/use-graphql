const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    nickname: String!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;

module.exports = userSchema;
