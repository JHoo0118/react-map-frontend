import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  input:focus{
        outline:none;
    }
`;
