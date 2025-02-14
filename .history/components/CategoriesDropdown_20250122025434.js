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
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: all 0.3s ease;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .back-button {
      background: none;
      border: none;
      color: #ffa500;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }

    .close-button {
      background: none;
      border: none;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    li {
      font-size: 18px;
      font-weight: 500;
      text-align: left;

      a {
        text-decoration: none;
        color: #ffa500;
        transition: color 0.3s ease;

        &:hover {
          color: #fff;
        }
      }
    }
  }
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
                setShowMobileMenu(false);
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
          <div className="header">
            <button
              className="back-button"
              onClick={() => setCurrentMenu("main")}
            >
              ← Nazad
            </button>
            <button
              className="close-button"
              onClick={() => setShowMobileMenu(false)}
            >
              × Zatvori
            </button>
          </div>
          <ul>
            {subCategories.map((subCategory) => (
              <li key={subCategory._id}>
                <Link href={`/categories/${subCategory.slug}`}>
                  {subCategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <DropdownContainer>
        <Trigger onClick={() => setShowMobileMenu(true)}>Kategorije</Trigger>
      </DropdownContainer>

      {showMobileMenu && (
        <MobileMenu>
          {currentMenu === "main" && (
            <div className="header">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Glavne kategorije
              </span>
              <button
                className="close-button"
                onClick={() => setShowMobileMenu(false)}
              >
                × Zatvori
              </button>
            </div>
          )}
          <ul>{renderMenuItems()}</ul>
        </MobileMenu>
      )}
    </>
  );
}
