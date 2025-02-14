const { default: styled } = require("styled-components");

const WhiteBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin: 0;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
        width: 100%;
        margin: 0 auto;
    }
`;

export default WhiteBox;