import { gql } from 'apollo-boost';

/* Recipe Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

/* Recipe Mutations */

/** User Queries */

/** User Mutations */

export const SIGNUP_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    signupUser(username: $username, password: $password) {
      token
    }
  }
`;