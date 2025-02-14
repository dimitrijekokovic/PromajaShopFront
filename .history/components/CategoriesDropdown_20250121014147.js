import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownToggle = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #f39052;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  margin-top: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "block" : "none")};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: #444;
  }
`;

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <DropdownWrapper>
      <DropdownToggle onClick={toggleDropdown}>
        Kategorije
      </DropdownToggle>
      <DropdownMenu open={open}>
        <DropdownItem href="/categories/varalice">Varalice</DropdownItem>
        <DropdownItem href="/categories/majice">Majice</DropdownItem>
        <DropdownItem href="/categories/vobleri">Vobleri</DropdownItem>
        <DropdownItem href="/categories/twitchevi">Twitchevi</DropdownItem>
        <DropdownItem href="/categories/kasike">Kašike</DropdownItem>
        <DropdownItem href="/categories/glavinjare">Glavinjare</DropdownItem>
        <DropdownItem href="/categories/silikonci">Silikonci</DropdownItem>
      </DropdownMenu>
    </DropdownWrapper>
  );
}
