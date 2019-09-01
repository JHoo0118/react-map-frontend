import { createContext } from "react";

const Context = createContext({
  draft: null,
  isOpened: false,
  pins: [],
  currentPin: null
});

export default Context;
