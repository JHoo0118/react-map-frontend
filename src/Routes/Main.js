import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Map from "../Components/Map";
import { ME } from "../Components/SharedQueries";
import Helmet from "react-helmet";

const Wrapper = styled.div`
  height: 100vh;
`;

export default () => {
  const { data, loading } = useQuery(ME);
  return (
    <Wrapper>
      <Helmet>
        <title>지도 | React Map</title>
      </Helmet>
      {data && !loading ? (
        <>
          <Header name={data.me.name} picture={data.me.picture} size="sm" />
          <Map data={data} />
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};
