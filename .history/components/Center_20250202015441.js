import { Children } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px; /* Dodatni padding da se ne lepi uz ivice ekrana */
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
