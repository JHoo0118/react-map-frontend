import { createContext } from "react";

const Context = createContext({
  draft: null,
  isOpened: false,
  pins: [],
  seeFullPhoto: false,
  currentPin: null
});

export default Context;
