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
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  z-index: 20;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 15px 0;
  }

  button {
    background: none;
    border: none;
    color: #ffa500;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;
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
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Track current menu (main or subcategories)
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
      return (
        <>
          <BackButton onClick={() => setShowMobileMenu(false)}>← Zatvori</BackButton>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id}>
              <button
                onClick={() => {
                  const hasSubcategories = categories.some(
                    (cat) => cat.parent?._id === mainCategory._id
                  );
                  if (hasSubcategories) {
                    setCurrentMenu(mainCategory._id); // Navigate to subcategories
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {mainCategory.name}
              </button>
            </li>
          ))}
        </>
      );
    } else {
      const subCategories = categories.filter(
        (cat) => cat.parent?._id === currentMenu
      );
      return (
        <>
          <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
          {subCategories.map((subCategory) => (
            <li key={subCategory._id}>
              <Link href={`/categories/${subCategory.slug}`} onClick={() => setShowMobileMenu(false)}>
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
        <Trigger onClick={() => setShowMobileMenu(true)}>Kategorije</Trigger>
        <DropdownMenu isOpen={isOpen} />
      </DropdownContainer>

      {showMobileMenu && (
        <MobileMenu>
          <ul>{renderMenuItems()}</ul>
        </MobileMenu>
      )}
    </>
  );
}
