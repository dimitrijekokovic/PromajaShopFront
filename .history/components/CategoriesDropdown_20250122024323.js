import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;
`;

const Trigger = styled.div`
  cursor: pointer;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px;
    color: #ffa500;
    text-align: left;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #333;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  z-index: 10;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 250px;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    padding: 20px;
  }
`;

const CategoryItem = styled.div`
  color: #fff;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    color: #f7934b;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function CategoriesDropdown({ closeMenu }) {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      }
    };
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent);

  const handleCategoryClick = (categorySlug) => {
    if (closeMenu) closeMenu();
    // Redirect logic if needed
  };

  const renderMenuItems = () => {
    if (currentMenu === "main") {
      return mainCategories.map((mainCategory) => (
        <CategoryItem
          key={mainCategory._id}
          onClick={() => setCurrentMenu(mainCategory._id)}
        >
          {mainCategory.name}
        </CategoryItem>
      ));
    } else {
      const subCategories = categories.filter(
        (cat) => cat.parent?._id === currentMenu
      );
      return (
        <>
          <BackButton onClick={() => setCurrentMenu("main")}>
            ← Nazad
          </BackButton>
          {subCategories.map((subCategory) => (
            <CategoryItem
              key={subCategory._id}
              onClick={() => handleCategoryClick(subCategory.slug)}
            >
              {subCategory.name}
            </CategoryItem>
          ))}
        </>
      );
    }
  };

  return (
    <DropdownContainer>
      <Trigger onClick={() => setIsOpen(!isOpen)}>Kategorije</Trigger>
      <DropdownMenu isOpen={isOpen}>{renderMenuItems()}</DropdownMenu>
    </DropdownContainer>
  );
}
