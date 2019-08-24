import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
  border: ${props => props.theme.whiteBoxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.whiteColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  color: ${props => props.theme.blackColor};
  &::placeholder {
    color: ${props => props.theme.blackColor};
  }
  &:focus {
    outline-color: blue;
  }
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text"
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default Input;
