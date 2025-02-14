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
  background: #333;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  z-index: 100;
  width: 250px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")} !important;

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
  top: 20px;
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
  top: 20px;
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("⏳ Fetching categories...");
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Greska pri fetchovanju kategorija!");
        const data = await res.json();
        console.log("✅ Kategorije učitane:", data);
        setCategories(data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju kategorija:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    console.log("➡ Miš je ušao u dropdown");
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    console.log("⬅ Miš je izašao iz dropdowna");
    setIsDropdownOpen(false);
  };

  const mainCategories = categories.filter((cat) => !cat.parent);
  console.log("🔍 Glavne kategorije:", mainCategories);

  return (
    <>
      {/* DESKTOP VERZIJA */}
      <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Trigger onClick={() => setIsMobileMenuOpen(true)}>Kategorije</Trigger>
        <DropdownMenu isVisible={isDropdownOpen}>
          {mainCategories.map((category) => {
            const subCategories = categories.filter((cat) => cat.parent?._id === category._id);
            return (
              <li key={category._id}>
                <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                {subCategories.length > 0 && (
                  <ul>
                    {subCategories.map((sub) => (
                      <li key={sub._id}>
                        <Link href={`/categories/${sub.slug}`}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </DropdownMenu>
      </DropdownContainer>

      {/* MOBILNA VERZIJA */}
      {isMobileMenuOpen && (
        <MobileMenu>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>× Zatvori</CloseButton>
          <ul>
            {mainCategories.map((category) => {
              const subCategories = categories.filter((cat) => cat.parent?._id === category._id);
              return (
                <li key={category._id}>
                  <Link href={`/categories/${category.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {category.name}
                  </Link>
                  {subCategories.length > 0 && (
                    <ul>
                      {subCategories.map((sub) => (
                        <li key={sub._id}>
                          <Link href={`/categories/${sub.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </MobileMenu>
      )}
    </>
  );
}
