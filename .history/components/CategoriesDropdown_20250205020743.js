import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.div`
  cursor: pointer;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: bold;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  width: 250px;
  z-index: 9999;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    padding: 20px;
    display: ${(props) => (props.$isOpen ? "block" : "none")};
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #444;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #f7934b;
    }
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #ffa500;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        console.log("Učitane kategorije:", data);
        setCategories(data);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      }
    };
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent);
  const getSubcategories = (parentId) => categories.filter((cat) => cat.parent?._id === parentId);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setCurrentMenu("main");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const renderMenuItems = () => {
    if (currentMenu === "main") {
      return (
        <CategoryList>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id} onClick={() => setCurrentMenu(mainCategory._id)}>
              {mainCategory.name}
            </li>
          ))}
        </CategoryList>
      );
    } else {
      const subCategories = getSubcategories(currentMenu);
      return (
        <>
          <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
          <CategoryList>
            {subCategories.map((subCategory) => (
              <li key={subCategory._id}>
                <Link href={`/categories/${subCategory.slug}`}>{subCategory.name}</Link>
              </li>
            ))}
          </CategoryList>
        </>
      );
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <Trigger onClick={() => setIsOpen((prev) => !prev)}>Kategorije</Trigger>
      <DropdownMenu $isOpen={isOpen}>
        {isOpen && <CloseButton onClick={() => setIsOpen(false)}>× Zatvori</CloseButton>}
        {renderMenuItems()}
      </DropdownMenu>
    </DropdownContainer>
  );
}
