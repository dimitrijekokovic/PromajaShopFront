import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
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
  let timeoutId;

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

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 300);
  };

  const renderMenuItems = () => {
    if (currentMenu === "main") {
      return mainCategories.map((mainCategory) => (
        <CategoryItem
          key={mainCategory._id}
          onMouseEnter={() => setCurrentMenu(mainCategory._id)}
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
              onClick={() => {
                if (closeMenu) closeMenu();
              }}
            >
              <Link href={`/categories/${subCategory.slug}`}>
                {subCategory.name}
              </Link>
            </CategoryItem>
          ))}
        </>
      );
    }
  };

  return (
    <DropdownContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Trigger>Kategorije</Trigger>
      <DropdownMenu isOpen={isOpen}>{renderMenuItems()}</DropdownMenu>
    </DropdownContainer>
  );
}
