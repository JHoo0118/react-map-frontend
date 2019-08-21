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

const ButtonText = styled.span`
  color: orange;
`;

const ButtonIcon = styled.img`
  margin-left: 5px;
  color: orange;
`;

export const Signout = ({ classes }) => {
  return (
    <Wrapper>
      <Box>로그아웃 가능</Box>
    </Wrapper>
  );
};
