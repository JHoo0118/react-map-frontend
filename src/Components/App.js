import React from "react";
import { gql } from "apollo-boost";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../Styles/Theme";
import styled from "styled-components";
import Routes from "./Routes";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </>
    </ThemeProvider>
  );
};
