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
      createdAt
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
        id
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

export const DELETE_PIN = gql`
  mutation deletePin($id: String!) {
    deletePin(id: $id) {
      id
    }
  }
`;
