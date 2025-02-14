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

const MobileMenu = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
  color: #fff;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: 20px;
`;

const CloseButton = styled.div`
  color: #ffa500;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoryItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #f7934b;
  }
`;

const BackButton = styled.div`
  color: #ffa500;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DesktopMenu = styled.ul`
  @media (max-width: 768px) {
    display: none;
  }
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
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState("main"); // "main" or category ID

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

  const handleCategoryClick = (categoryId) => {
    setMobileMenu(categoryId);
  };

  const renderMobileMenu = () => {
    if (mobileMenu === "main") {
      return (
        <>
          {mainCategories.map((mainCategory) => (
            <CategoryItem
              key={mainCategory._id}
              onClick={() => handleCategoryClick(mainCategory._id)}
            >
              {mainCategory.name}
            </CategoryItem>
          ))}
        </>
      );
    } else {
      const subCategories = categories.filter(
        (cat) => cat.parent?._id === mobileMenu
      );
      const mainCategory = categories.find((cat) => cat._id === mobileMenu);
      return (
        <>
          <BackButton onClick={() => setMobileMenu("main")}>← Nazad</BackButton>
          <CategoryItem>
            <Link href={`/categories/${mainCategory.slug}`}>
              {mainCategory.name}
            </Link>
          </CategoryItem>
          {subCategories.map((subCategory) => (
            <CategoryItem key={subCategory._id}>
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
    <DropdownContainer>
      <Trigger onClick={() => setIsOpen(!isOpen)}>Kategorije</Trigger>
      <DesktopMenu isOpen={isOpen}>
        {mainCategories.map((mainCategory) => (
          <li key={mainCategory._id}>
            <Link href={`/categories/${mainCategory.slug}`}>
              {mainCategory.name}
            </Link>
          </li>
        ))}
      </DesktopMenu>
      <MobileMenu isOpen={isOpen}>{renderMobileMenu()}</MobileMenu>
    </DropdownContainer>
  );
}
