import React, { useContext } from "react";
import styled from "styled-components";
import Context from "./context";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";
import PinContent from "./Pin/PinContent";

const BlogBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.whiteColor};
  height: 100%;
  width: 400px;
  width: ${props => props.width}px;
  justify-content: center;
  position: absolute;
  transition: all 0.4s ease-in-out;
  transform: ${props => props.translateVal};
  overflow-x: hidden;
  z-index: 30;
`;

export default ({ translateVal = "translate(-400px)" }) => {
  const { state } = useContext(Context);
  const { draft, currentPin } = state;

  return (
    <BlogBox translateVal={translateVal}>
      {!draft ? (
        !currentPin ? (
          <NoContent />
        ) : (
          <PinContent />
        )
      ) : !currentPin ? (
        <CreatePin draft={draft} />
      ) : null}
    </BlogBox>
  );
};
