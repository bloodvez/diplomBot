import React from "react";
import { LoadingDiv, Spinner } from "./components";

function Loading() {
  return (
    <LoadingDiv>
      <Spinner src={"/img/logo.jpg"} alt="img" />
      <span>Loading</span>
    </LoadingDiv>
  );
}

export default Loading;
