import { useContext } from "react";
import { ContextApi } from "../contexts/ContextProvider";

const useStore = () => {
  return useContext(ContextApi);
};

export default useStore;
