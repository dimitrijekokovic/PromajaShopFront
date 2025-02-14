import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #222;
  color: #fff;
  z-index: 20;
  overflow-y: auto;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  padding: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;

  li {
    margin: 15px 0;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 18px;

      &:hover {
        color: #ffa500;
      }
    }
  }
`;

export default function CategoriesDropdownMobile({ menuOpen, setMenuOpen }) {
  const [categories, setCategories] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("main");

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
                setCurrentMenu(mainCategory._id);
              } else {
                setMenuOpen(false);
              }
            }}
          >
            {mainCategory.name}
          </a>
        </li>
      ));
    } else {
      const subCategories = categories.filter(
        (cat) => cat.parent?._id === currentMenu
      );
      return (
        <>
          <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
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
    <MobileMenu open={menuOpen}>
      <button onClick={() => setMenuOpen(false)}>× Zatvori</button>
      <MenuItems>{renderMenuItems()}</MenuItems>
    </MobileMenu>
  );
}
