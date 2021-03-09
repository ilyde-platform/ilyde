import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

const initialState = {
  "sidebarSelection": {
    "level1": "projects",
    "level2": null,
  },
  "contentId": "projects",
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export default Store;