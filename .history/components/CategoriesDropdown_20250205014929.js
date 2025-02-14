import { useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: #333;
  color: white;
  list-style: none;
  padding: 10px;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  li {
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background: #444;
    }

    ul {
      display: none;
      position: absolute;
      top: 0;
      left: 100%;
      background: #444;
      padding: 10px;
      list-style: none;
      border-radius: 4px;

      li {
        padding: 5px 10px;

        &:hover {
          background: #555;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }
`;

export default function CategoriesDropdown() {
  return (
    <DropdownWrapper>
      <DropdownButton>Kategorije</DropdownButton>
      <DropdownMenu>
        <li>
          Varalice
          <ul>
            <li>Vobleri</li>
            <li>Twitchevi</li>
            <li>Kašike</li>
            <li>Glavinjare</li>
            <li>Silikoni</li>
          </ul>
        </li>
        <li>Majice</li>
      </DropdownMenu>
    </DropdownWrapper>
  );
}
