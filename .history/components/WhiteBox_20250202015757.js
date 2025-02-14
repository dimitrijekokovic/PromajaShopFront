const { default: styled } = require("styled-components");

const WhiteBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

export default WhiteBox;
