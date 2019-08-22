import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div``;

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
  color: #e6e6e6;
  font-size: 80px;
  font-weight: 600;
  animation: ${Animation} 1s linear infinite;
`;

export default () => <LoadingText>로딩중</LoadingText>;
