import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

// --- STYLED COMPONENTS ---
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #222;
  color: #fff;
  z-index: 20;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  button.close-btn {
    background: none;
    border: none;
    color: #ffa500;
    font-size: 24px;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 20px auto;
    text-align: center;
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
    display: block;
    padding: 10px 0;

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
  align-self: flex-start;
  margin-bottom: 20px;
`;

// --- COMPONENT ---
export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // For desktop dropdown
  const [currentMenu, setCurrentMenu] = useState("main"); // For mobile navigation
  const [showMobileMenu, setShowMobileMenu] = useState(false); // For mobile menu visibility
  let closeTimeout;

  // Fetch categories
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

  // --- DESKTOP HOVER HANDLERS ---
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setIsOpen(false), 300);
  };

  // --- RENDER MENU ITEMS ---
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
          <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
          {subCategories.map((subCategory) => (
            <li key={subCategory._id}>
              <Link
                href={`/categories/${subCategory.slug}`}
                onClick={() => setShowMobileMenu(false)}
              >
                {subCategory.name}
              </Link>
            </li>
          ))}
        </>
      );
    }
  };

  // --- RENDER ---
  return (
    <>
      {/* DESKTOP DROPDOWN */}
      <DropdownContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Trigger>Kategorije</Trigger>
        <DropdownMenu isOpen={isOpen}>{renderMenuItems()}</DropdownMenu>
      </DropdownContainer>

      {/* MOBILE MENU */}
      {showMobileMenu && (
        <MobileMenu>
          <header>
            {currentMenu !== "main" && (
              <BackButton onClick={() => setCurrentMenu("main")}>← Nazad</BackButton>
            )}
            <button className="close-btn" onClick={() => setShowMobileMenu(false)}>
              ×
            </button>
          </header>
          <ul>{renderMenuItems()}</ul>
        </MobileMenu>
      )}

      {/* MOBILE TRIGGER */}
      <div
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#ffa500",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setShowMobileMenu(true)}
        >
          Kategorije
        </button>
      </div>
    </>
  );
}
