import React, { useContext } from "react";
import styled from "styled-components";
import useWindowDimensions from "./WindowDimesions";
import Context from "./context";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: black;
  transition: all 0.3s ease-in-out;
  transform: ${props => props.translateVal};
  z-index: 15;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-image: url(//maps.gstatic.com/tactile/omnibox/clear-1x-20150504.png);
  background-size: 96px 24px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  z-index: 16px;
`;

const FullPhoto = styled.img`
  max-width: 1280px;
  max-height: 720px;
`;

export default () => {
  const { state, dispatch } = useContext(Context);
  const { width, height } = useWindowDimensions();
  const { image } = state.currentPin;

  const HandleCloseButton = () => {
    dispatch({ type: "CLOSE_FULL_PHOTO" });
  };

  return (
    <Container
      width={state.isOpened ? width - 400 : width}
      height={height}
      translateVal={state.isOpened && "translate(0)"}
    >
      {state.seeFullPhoto && <CloseButton onClick={HandleCloseButton} />}
      <FullPhoto src={image} />
    </Container>
  );
};
