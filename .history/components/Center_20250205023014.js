import { Children } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
