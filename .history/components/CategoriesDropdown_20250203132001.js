import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.div`
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#ffa500" : "#bbbbbb")};
  font-size: 16px;
  font-weight: 500;
  padding: 10px;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
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
  z-index: 100;
  width: 250px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

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
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  z-index: 200;
  overflow-y: auto;
  padding: 20px;
  display: ${({ show }) => (show ? "flex" : "none")};
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

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* DESKTOP VERZIJA */}
      <DropdownContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Trigger onClick={() => setIsOpen(!isOpen)}>Kategorije</Trigger>
        <DropdownMenu isOpen={isOpen}>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id}>
              <Link href={`/categories/${mainCategory.slug}`}>
                {mainCategory.name}
              </Link>
            </li>
          ))}
        </DropdownMenu>
      </DropdownContainer>

      {/* MOBILNA VERZIJA */}
      <MobileMenu show={showMobileMenu}>
        <button onClick={() => setShowMobileMenu(false)}>× Zatvori</button>
        <ul>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id}>
              <Link
                href={`/categories/${mainCategory.slug}`}
                onClick={() => setShowMobileMenu(false)}
              >
                {mainCategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </MobileMenu>
    </>
  );
}
