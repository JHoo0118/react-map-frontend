import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: "1em 0.5em";
  text-align: center;
  width: 100%;
`;

const Icon = styled.div``;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PinContent = ({ classes }) => {
  return <Container>핀 게시글</Container>;
};
