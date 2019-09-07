import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = size => {
  let number;
  if (size === "us") {
    number = 16;
  } else if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 46;
  } else if (size === "lg") {
    number = 100;
  }
  return `
          width:${number}px;
          height:${number}px;
          `;
};

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image:url(${props => props.url});
  background-size:cover;
  border-radius:50%;
`;

const Picture = ({ size = "sm", url, className }) => (
  <Container className={className} size={size} url={url} />
);

Picture.propTypes = {
  size: PropTypes.oneOf(["us", "sm", "md", "lg"]),
  url: PropTypes.string.isRequired
};

export default Picture;
