import React, { useContext } from "react";
import styled from "styled-components";
import Context from "./context";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";

const BlogBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.whiteColor};
  height: 100%;
  width: 400px;
  width: ${props => props.width}px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: absolute;
  transition: all 0.3s ease-in-out;
  transform: ${props => props.translateVal};
  overflow-x: hidden;
  z-index: 30;
`;

export default ({ translateVal = "translate(-400px)" }) => {
  const { state } = useContext(Context);
  const { draft } = state;

  return (
    <BlogBox translateVal={translateVal}>
      {!draft ? <NoContent /> : <CreatePin draft={draft} />}
    </BlogBox>
  );
};
