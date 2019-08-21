import React from "react";
import styled from "styled-components";
import { device } from "./Device";

const Container = styled.div`
  display: flex;
  ${device.midium`
    display: "flex";
    flex-direction: column-reverse;
  `}
`;

const NavigationControl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1em;
`;

const DeleteIcon = styled.button`
  color: red;
`;

const PopupImage = styled.div`
  padding: 0.4em;
  height: 200;
  width: 200;
  object-fit: "cover";
`;

const PopupTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default () => <Container>지도</Container>;
