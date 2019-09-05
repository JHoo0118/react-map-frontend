import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password)
  }
`;

export const CONFIRM = gql`
  mutation confirm($email: String!, $password: String!) {
    confirm(email: $email, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
