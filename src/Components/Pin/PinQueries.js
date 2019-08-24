import { gql } from "apollo-boost";

export const CREATE_PIN = gql`
  mutation createPin(
    $title: String!
    $content: String!
    $image: String!
    $latitude: Float
    $longitude: Float
  ) {
    createPin(
      title: $title
      content: $content
      image: $image
      latitude: $latitude
      longitude: $longitude
    ) {
      title
      content
      image
      latitude
      longitude
      author {
        id
        name
        email
        picture
      }
    }
  }
`;

export const GET_PINS_QUERY = gql`
  {
    getPins {
      id
      createdAt
      title
      image
      content
      latitude
      longitude
      author {
        id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        author {
          id
          name
          picture
        }
      }
    }
  }
`;
