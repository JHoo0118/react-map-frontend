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

const LoadingText = styled.span`
  color: ${props => props.theme.blackColor};
  font-size: 80px;
  font-weight: 600;
  animation: ${Animation} 1s linear infinite;
  top: 45%;
  left: 45%;
  position: absolute;
  display: block;

  ${Media.large`left:40%;`}
  ${Media.medium`left:30%;`}
  ${Media.small`left:20%;`}
`;

export default () => <LoadingText>로딩중</LoadingText>;
