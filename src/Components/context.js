import { createContext } from "react";

const Context = createContext({
  draft: null,
  isOpened: false
});

export default Context;
