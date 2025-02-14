import { Children } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 ;
    overflow: hidden;
`;

export default function Center({ children }) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}
