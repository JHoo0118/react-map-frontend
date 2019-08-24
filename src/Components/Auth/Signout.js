import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
`;

export const Signout = () => {
  return (
    <Wrapper>
      <Box>작성 예정</Box>
    </Wrapper>
  );
};
