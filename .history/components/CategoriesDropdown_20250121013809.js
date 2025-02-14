import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  background-color: #222;
  color: #ffa500;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 15px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  background-color: #333;
  color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  top: 100%;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
  }
`;

const DropdownItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  display: block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        Kategorije
        <span>{isOpen ? "▲" : "▼"}</span>
      </DropdownButton>
      <DropdownContent open={isOpen}>
        <DropdownItem href="/categories/vobleri" onClick={closeDropdown}>
          Vobleri
        </DropdownItem>
        <DropdownItem href="/categories/twitchevi" onClick={closeDropdown}>
          Twitchevi
        </DropdownItem>
        <DropdownItem href="/categories/kasike" onClick={closeDropdown}>
          Kašike
        </DropdownItem>
        <DropdownItem href="/categories/silikonci" onClick={closeDropdown}>
          Silikonci
        </DropdownItem>
        <DropdownItem href="/categories/majice" onClick={closeDropdown}>
          Majice
        </DropdownItem>
        <DropdownItem href="/categories/glavinjare" onClick={closeDropdown}>
          Glavinjare
        </DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
}
