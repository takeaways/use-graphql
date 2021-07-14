import { gql } from 'graphql-tag';

export const GET_USERS = gql`
  query GET_MESSAGES {
    users {
      id
      nickname
    }
  }
`;

export const GET_USER = gql`
  query GET_MESSAGES($id: ID!) {
    user(id: $id) {
      id
      nickname
    }
  }
`;
