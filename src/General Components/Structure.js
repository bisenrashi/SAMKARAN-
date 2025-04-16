import { useState } from "react";

export const useLoginState = () => {
  const initialState = {
    login: false,
    name: "",
    username: "",
    userId: "",
    password: "",
    profile:""
  };
  
  return useState(initialState);
};