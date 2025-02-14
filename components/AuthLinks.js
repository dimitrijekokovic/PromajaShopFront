import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  color: #ff6600; // narandžasta boja
  font-weight: bold; // bold slova
  text-decoration: none; // uklanja podvlačenje

  &:hover {
    color: #ff4500; // tamnija nijansa narandžaste za hover efekat
  }
`;

const TextWrapper = styled.p`
  font-size: 1rem;
  color: #333; // tamnosiva boja
  text-align: center;
`;

// Komponenta koja se prilagođava na osnovu tipa (register/login)
export default function AuthLinks({ type }) {
  return (
    <>
      {type === "register" ? (
        <TextWrapper>
          Već imate nalog? <StyledLink href="/login">Prijavite se</StyledLink>
        </TextWrapper>
      ) : (
        <TextWrapper>
          Nemate nalog? <StyledLink href="/register">Registrujte se</StyledLink>
        </TextWrapper>
      )}
    </>
  );
}
