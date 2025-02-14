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

const MobileMenuContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 999;
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;

  li {
    margin: 10px 0;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 16px;

      &:hover {
        color: #f7934b;
      }
    }
  }
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Main or specific category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent);

  const renderMenuItems = () => {
    if (currentMenu === "main") {
      return mainCategories.map((mainCategory) => (
        <li key={mainCategory._id}>
          <button
            onClick={() => {
              const hasSubcategories = categories.some(
                (cat) => cat.parent?._id === mainCategory._id
              );
              if (hasSubcategories) {
                setCurrentMenu(mainCategory._id);
              }
            }}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          >
            {mainCategory.name}
          </button>
        </li>
      ));
    } else {
      const parentCategory = mainCategories.find(
        (cat) => cat._id === currentMenu
      );
      const subCategories = categories.filter(
        (cat) => cat.parent?._id === currentMenu
      );
      return (
        <>
          <li>
            <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
          </li>
          {parentCategory && (
            <li>
              <Link href={`/categories/${parentCategory.slug}`}>
                {parentCategory.name}
              </Link>
            </li>
          )}
          {subCategories.map((subCategory) => (
            <li key={subCategory._id}>
              <Link href={`/categories/${subCategory.slug}`}>
                {subCategory.name}
              </Link>
            </li>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <DropdownContainer>
        <Trigger onClick={() => setIsOpen(true)}>Kategorije</Trigger>
      </DropdownContainer>
      <MobileMenuContainer isOpen={isOpen}>
        <MenuHeader>
          <span>{currentMenu === "main" ? "Kategorije" : "Potkategorije"}</span>
          <button
            onClick={() => {
              setIsOpen(false);
              setCurrentMenu("main");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Zatvori ✕
          </button>
        </MenuHeader>
        <MenuList>{renderMenuItems()}</MenuList>
      </MobileMenuContainer>
    </>
  );
}
