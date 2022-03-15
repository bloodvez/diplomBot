import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ITrashState, TrashState } from "./trashState";

export const TrashContext = React.createContext<ITrashState | null>(null);
const trashContext = new TrashState();

//TODO uninstall router and webvitals
ReactDOM.render(
  <BrowserRouter>
    <TrashContext.Provider value={trashContext}>
      <App />
    </TrashContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

//@ts-ignore
window.trash = trashContext