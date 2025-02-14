import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    padding: 10px 15px; /* Dodan padding za bolje poravnanje */
    margin-bottom: 15px; /* Više prostora između inputa */
    border: 1px solid #ddd; /* Suptilniji border */
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1rem; /* Usklađivanje fonta */
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #ff7a00; /* Fokus border u skladu sa temom */
        outline: none;
    }
`;

export default function Input(props) {
    return <StyledInput {...props} />;
}
