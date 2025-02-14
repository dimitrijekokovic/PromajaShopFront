import { Children } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 ;
`;

export default function Center({ children }) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}
