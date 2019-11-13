import React, { useState, useEffect } from "react";

function getWindowsDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimension, setWindowDimension] = useState(
    getWindowsDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimension(getWindowsDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // removing event listener when components unmounts
  }, []); // on every update

  return windowDimension;
}
