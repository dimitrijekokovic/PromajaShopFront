import { useEffect, useState, useRef  } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;
    display: inline-block; /* Osigurava da ne raste u širinu */
`;

const Trigger = styled.div`
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#ffa500" : "#bbbbbb")};
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px;
    text-align: left;
  }
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: red; /* Dodaj privremeno crvenu boju da vidiš da li se menja */
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  z-index: 9999;
  width: 250px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  transition: all 0.3s ease-in-out;

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

const SubMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 100%;
  background: #444;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  display: none;
  width: 200px;

  li {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 15px;

    &:hover {
      color: #f7934b;
    }
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
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
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 769px) {
    display: none;
  }

  button {
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    color: #ffa500;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    width: 100%;
  }

  li {
    margin: 15px 0;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;

    &:hover {
      color: #ffa500;
    }
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  
  position: absolute;
  left: 20px;
  top: 20px; /* Razmak od vrha */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px; /* Razmak od vrha */
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Track current menu (main or subcategories)
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const timeoutId = useRef(null);

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
    console.log("🔵 Hover nad Kategorijama - Otvaram meni");
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    console.log("🔴 Miš napustio Kategorije - Čekam pre zatvaranja");
    timeoutId.current = setTimeout(() => {
      console.log("⏳ Zatvaram meni...");
      setIsOpen(false);
    }, 500); // Produži na 500ms
  };
  
  

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
                setShowMobileMenu(false); // Zatvara hamburger meni
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
              <Link
                href={`/categories/${subCategory.slug}`}
                onClick={() => {
                  setShowMobileMenu(false); // Zatvara hamburger meni
                  setCurrentMenu("main"); // Resetuje meni na glavni
                }}
              >
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
      <DropdownContainer onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
      <Trigger>Kategorije</Trigger>
      {isOpen && (
  <DropdownMenu key={isOpen} $isOpen={isOpen}>
    {categories.map((category) => (
      <li key={category._id}>
        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
      </li>
    ))}
  </DropdownMenu>
)}

    </DropdownContainer>

      {showMobileMenu && (
        <MobileMenu>
          <CloseButton  onClick={() => setShowMobileMenu(false)}>× Zatvori</CloseButton >
          <ul>{renderMenuItems()}</ul>
        </MobileMenu>
      )}
    </>
  );
}
