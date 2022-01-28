import React, { createContext } from "react";
import useData from "../hooks/useData";

export const ContextApi = createContext();
const ContextProvider = ({ children }) => {
  const allContext = useData();
  return (
    <ContextApi.Provider value={allContext}>{children}</ContextApi.Provider>
  );
};

export default ContextProvider;
