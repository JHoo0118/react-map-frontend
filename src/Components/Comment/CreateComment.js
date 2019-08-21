import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.div`
  display: flex;
  align-items: center;
`;
const Input = styled.div`
  margin-left: 8;
  flex: 1;
`;

const ClearButton = styled.button`
  padding: 0;
  color: red;
`;
const SendButton = styled.button`
  padding: 0;
  color: darkblue;
`;

export const CreateComment = ({ classes }) => {
  return <Container>댓글 추가</Container>;
};
