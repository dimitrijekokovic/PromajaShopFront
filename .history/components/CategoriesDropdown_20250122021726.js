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

const DropdownMenu = styled.ul`
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

  li {
    margin: 10px 0;
    font-size: 16px;
    position: relative;

    &:hover > ul {
      display: block;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #f7934b;
    }
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    background: none;
    border: none;
    box-shadow: none;
    padding: 0;

    li {
      margin: 10px 0;
    }
  }
`;

const SubMenu = styled.ul`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;
    width: 100%;
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

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Track current menu (main or subcategories)

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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const hasSubcategories = categories.some(
                (cat) => cat.parent?._id === mainCategory._id
              );
              if (hasSubcategories) {
                setCurrentMenu(mainCategory._id); // Navigate to subcategories
              }
            }}
          >
            {mainCategory.name}
          </a>
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
          <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
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
    <DropdownContainer>
      <Trigger
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Kategorije
      </Trigger>
      {isOpen && <DropdownMenu>{renderMenuItems()}</DropdownMenu>}
    </DropdownContainer>
  );
}
