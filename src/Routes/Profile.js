import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

const GET_USER = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      id
      name
      email
      password
      picture
      comments {
        id
        text
      }
      pins {
        id
        latitude
        longitude
      }
      isSelf
    }
  }
`;

export default withRouter(({ match: { params: { name } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { name } });
  if (!loading) {
    console.log(data);
  }
  return "Hello";
});
