import { useState } from "react";

export const useShow = () => {
  const [show, setShow] = useState<boolean>(false);

  function open() {
    setShow(true);
  }
  const close = () => {
    setShow(false);
  };

  return { show, open, close };
};
