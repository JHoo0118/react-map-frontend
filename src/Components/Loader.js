import React from "react";
import styled, { keyframes } from "styled-components";
import Media from "./Media";

const Animation = keyframes`
  0% {
      opacity: 0
  }
  50% {
      opacity: 1
  }
  100% {
      opacity: 0
  }
`;

const LoadingText = styled.div`
  color: ${props => props.theme.blackColor};
  font-size: 80px;
  font-weight: 600;
  height: 100%;
  animation: ${Animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Media.small`font-size: 40px;`}
`;

export default () => <LoadingText>로딩중</LoadingText>;
