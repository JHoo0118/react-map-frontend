import { css } from "styled-components";

const sizes = {
  huge: "1440px",
  large: "1170px",
  medium: "768px",
  small: "450px"
};

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
