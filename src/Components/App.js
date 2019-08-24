import React, { useContext, useReducer } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
import Context from "./context";
import reducer from "./reducer";

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
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Context.Provider value={{ state, dispatch }}>
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
            </Wrapper>
          </Context.Provider>
        </Router>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </>
    </ThemeProvider>
  );
};
