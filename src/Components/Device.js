const size = {
  huge: "1440px",
  large: "1170px",
  medium: "768px",
  small: "450px"
};

export const device = Object.keys(size).reduce((acc, key) => {
  acc[key] = style => `
    @media (min-width: ${size[key]}) {
      ${style};
    }
  `;
  return acc;
}, {});
