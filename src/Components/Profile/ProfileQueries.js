import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
  mutation editProfile($name: String, $picture: String) {
    editProfile(name: $name, picture: $picture) {
      id
      name
      picture
      email
    }
  }
`;
