import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Map from "../Components/Map";

const ME = gql`
  {
    me {
      name
      picture
    }
  }
`;

const Wrapper = styled.div`
  height: 100vh;
`;

export default () => {
  const { data, loading } = useQuery(ME);
  return (
    <Wrapper>
      {data && !loading ? (
        <>
          <Header name={data.me.name} picture={data.me.picture} />
          <Map />
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};
