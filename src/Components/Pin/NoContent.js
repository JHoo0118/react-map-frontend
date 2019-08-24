import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-wrap: nowrap;
`;

const Text = styled.span`
  color: ${props => props.theme.blackColor};
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  color: ${props => props.theme.blackColor};
`;

export default () => {
  return (
    <Container>
      <IconContainer>
        <FontAwesomeIcon icon={faCompass} size="6x" />
      </IconContainer>
      <Text>위치를 클릭하여 핀을 만들어 주세요.</Text>
    </Container>
  );
};
