import { useEffect, useRef } from "react";

export const useUnMounted = () => {
  const unmounted = useRef(false);
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );
  return unmounted;
};
