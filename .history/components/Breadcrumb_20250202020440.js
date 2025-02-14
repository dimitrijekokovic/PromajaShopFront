import Link from "next/link";
import styled from "styled-components";

const BreadcrumbContainer = styled.nav`
  font-size: 0.9rem;
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding-left:25px;

  }
`;

const Crumb = styled.span`
  a, span {
    color: ${({ $isActive }) => ($isActive ? "#000" : "#000")};
    font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
    text-decoration: none;

    &:hover {
      color: #ff6600;
      text-decoration: none;
    }
  }
`;


export default function Breadcrumb({ items = [] }) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index}>
            {index !== 0 && <span> / </span>}
            {isLast ? (
              <Crumb $isActive={true}>
                <span>{item.label}</span> {/* Poslednja stavka kao boldovan tekst */}
              </Crumb>
            ) : (
              <Crumb $isActive={false}>
                <Link href={item.url}>{item.label}</Link> {/* Ostale stavke kao linkovi */}
              </Crumb>
            )}
          </span>
        );
      })}
    </BreadcrumbContainer>
  );
}

