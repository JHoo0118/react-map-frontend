import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
  mutation createComment($text: String!, $pinId: String!) {
    createComment(pinId: $pinId, text: $text) {
      id
      text
      author {
        id
        name
        picture
      }
      pin {
        id
      }
      createdAt
    }
  }
`;
