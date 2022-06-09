import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const rotate = keyframes`
from{transform: rotate(0deg);}
to{transform: rotate(360deg);}
`;

export const LoadingDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 256px;
  height: 256px;
  margin: 0;
  padding: 0;
`;

export const Spinner = styled.img`
  animation: ${rotate} ${3}s linear infinite;
  border-radius: 50%;
`;
