import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {TrashStore } from "./state/trashState";
import { ITrashState } from "./state/interfaces";

const trashContext = new TrashStore();
trashContext.init()
export const TrashContext = React.createContext<ITrashState>(trashContext);

ReactDOM.render(
  <>
    <TrashContext.Provider value={trashContext}>
      <App />
    </TrashContext.Provider>
  </>,
  document.getElementById("root")
);

//@ts-ignore
window.trash = trashContext