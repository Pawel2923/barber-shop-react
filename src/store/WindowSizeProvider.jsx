import { useState, useEffect } from "react";

import WindowSizeContext from "./window-size";

const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};

const WindowSizeProvider = (props) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <WindowSizeContext.Provider
      value={{
        width: windowSize.width,
        height: windowSize.height,
      }}
    >
      {props.children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeProvider;
