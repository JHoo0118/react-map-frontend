import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: ${props => props.theme.whiteBoxBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: black;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  &:hover {
    color: ${props => props.theme.lightGreenColor};
    border: ${props => props.theme.greenBoxBorder};
  }
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
