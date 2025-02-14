const { default: styled } = require("styled-components");

const WhiteBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin: 0 auto; /* Centriranje */
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 15px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
        width: calc(100% - 20px); /* Sprečava horizontalni skrol */
        max-width: 100%;
    }
`;

export default WhiteBox;
