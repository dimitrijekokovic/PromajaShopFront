// Ovo je obnovljeni kod za CategoriesDropdown.js koji vraća funkcionalnost
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownToggle = styled.button`
  background: none;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #222;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 10px 0;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: block;
  color: #bbbbbb;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownToggle onClick={toggleDropdown}>Kategorije</DropdownToggle>
      <DropdownMenu open={isOpen}>
        <DropdownItem href="/categories/vobleri">Vobleri</DropdownItem>
        <DropdownItem href="/categories/twitchevi">Twitchevi</DropdownItem>
        <DropdownItem href="/categories/kasike">Kašike</DropdownItem>
        <DropdownItem href="/categories/glavinjare">Glavinjare</DropdownItem>
        <DropdownItem href="/categories/silikonci">Silikonci</DropdownItem>
        <DropdownItem href="/categories/majice">Majice</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
}
