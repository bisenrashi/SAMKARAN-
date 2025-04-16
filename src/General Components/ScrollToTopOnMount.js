 import React, { useEffect } from "react"
 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
export const ScrollToTopOnMount = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };