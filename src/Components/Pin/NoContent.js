import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.div`
  font-size: 80px;
`;

export const NoContent = ({ classes }) => {
  return <Container>글 없음</Container>;
};
