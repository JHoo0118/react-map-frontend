import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: ${props => props.theme.whiteBoxBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.whiteColor};
  font-weight: 600;
  background-color: ${props => props.theme.buttonGreenColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  &:hover {
    background-color: #28a745;
  }
  &:focus {
    outline-color: ${props => props.theme.buttonGreenColor};
  }
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
