import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  text-align: left;

  &:hover {
    color: #f39052;
  }
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  background-color: #222;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px 0;
  border-radius: 8px;
  list-style: none;

  li {
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;

    &:hover {
      background-color: #444;
      color: #f39052;
    }
  }
`;

export default function CategoriesDropdown() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleMenu}>Kategorije</DropdownButton>
      <DropdownMenu open={menuOpen}>
        <li>
          <Link href="/categories/varalice">Varalice</Link>
        </li>
        <li>
          <Link href="/categories/majice">Majice</Link>
        </li>
        <li>
          <Link href="/categories/vobleri">Vobleri</Link>
        </li>
        <li>
          <Link href="/categories/twitchevi">Twitchevi</Link>
        </li>
        <li>
          <Link href="/categories/kasike">Kašike</Link>
        </li>
        <li>
          <Link href="/categories/glavinjare">Glavinjare</Link>
        </li>
        <li>
          <Link href="/categories/silikonci">Silikonci</Link>
        </li>
      </DropdownMenu>
    </DropdownContainer>
  );
}
