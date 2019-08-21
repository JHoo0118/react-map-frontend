import React from "react";
import styled from "styled-components";
import { device } from "./Device";

const Container = styled.div`
  min-width: 350;
  max-width: 400;
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  display: flex;
  justify-content: center;

  ${device.medium`
    max-width: 100%;
    max-height: 300;
    overflow-X: hidden;
    overflow-Y: "scroll"
  `}
`;

export default () => <Container>블로그</Container>;
