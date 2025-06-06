import styled, {css} from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
    color:#BBBBBB;
    background-color: #444444;
    border:0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center; 
    justify-content: center;
    font-size: 1rem;
    text-decoration:none;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    svg{
        height: 16px;
        margin-right: 5px;
    }
    ${props => props.block && css`
        display:block;
        width:100%;
        `};
    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color:#000;    
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        color:#fff;    
        border: 1px solid #fff;
    `}

    ${props => props.black && !props.outline && css`
        background-color: #000;
        color:#fff;    
    `}
    ${props => props.black && props.outline && css`
        background-color: transparent;
        color:#000;
        border: 1px solid #000;
    `}

    ${props => props.primary && !props.outline && css`
        color:white;
        background-color: ${primary};
        border: 1px solid ${primary};
    `}
    ${props => props.primary && props.outline && css`
        color:${primary};
        background-color: transparent;
        border: 1px solid ${primary};
    `}
    ${props => props.size === 'l' && css`
        font-size: 1rem;    
        padding: 10px 20px;
        svg {
            height:20px
        }
    `}
    
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}

