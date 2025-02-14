import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #222;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: ${(props) => (props.open ? "block" : "none")};
  padding: 10px;
`;

const DropdownItem = styled(Link)`
  display: block;
  color: #bbbbbb;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 3px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setOpen(!open)}>
        Kategorije
      </DropdownButton>
      <DropdownMenu open={open}>
        <DropdownItem href="/categories/vobleri">Vobleri</DropdownItem>
        <DropdownItem href="/categories/twitchevi">Twitchevi</DropdownItem>
        <DropdownItem href="/categories/kasike">Kašike</DropdownItem>
        <DropdownItem href="/categories/silikonci">Silikonci</DropdownItem>
        <DropdownItem href="/categories/majice">Majice</DropdownItem>
        <DropdownItem href="/categories/glavinjare">Glavinjare</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
}
