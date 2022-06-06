import React from "react";
import { LoadingDiv, Spinner } from "./components";

interface LoadingProp {
  text?: string;
}

function Loading(prop:LoadingProp) {
  return (
    <LoadingDiv>
      <Spinner src={"/img/logo.jpg"} alt="img" />
      <br></br>
      <span>{prop.text || 'Loading'}</span>
    </LoadingDiv>
  );
}

export default Loading;
