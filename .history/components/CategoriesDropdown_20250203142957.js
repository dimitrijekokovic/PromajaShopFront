import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.div`
  cursor: pointer;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;

  &:hover {
    color: #ffa500;
  }

  @media (max-width: 768px) {
    font-size: 18px;
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
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};

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

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const res = await fetch("/api/categories");
        const data = await res.json();
        console.log("Kategorije učitane:", data);
        setCategories(data);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      }
    };
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent);
  console.log("Glavne kategorije:", mainCategories);

  const handleMouseEnter = () => {
    console.log("Miš je ušao u dropdown");
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    console.log("Miš je izašao iz dropdowna");
    setIsDropdownOpen(false);
  };

  return (
    <>
      <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Trigger onClick={() => setIsMobileMenuOpen(true)}>Kategorije</Trigger>
        <DropdownMenu isVisible={isDropdownOpen}>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id}>
              <Link href={`/categories/${mainCategory.slug}`}>{mainCategory.name}</Link>
              <SubMenu>
                {categories
                  .filter((cat) => cat.parent?._id === mainCategory._id)
                  .map((subCategory) => (
                    <li key={subCategory._id}>
                      <Link href={`/categories/${subCategory.slug}`}>{subCategory.name}</Link>
                    </li>
                  ))}
              </SubMenu>
            </li>
          ))}
        </DropdownMenu>
      </DropdownContainer>

      {isMobileMenuOpen && (
        <MobileMenu>
          <button onClick={() => setIsMobileMenuOpen(false)}>× Zatvori</button>
          <ul>
            {mainCategories.map((mainCategory) => (
              <li key={mainCategory._id}>
                <Link href={`/categories/${mainCategory.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {mainCategory.name}
                </Link>
                <ul>
                  {categories
                    .filter((cat) => cat.parent?._id === mainCategory._id)
                    .map((subCategory) => (
                      <li key={subCategory._id}>
                        <Link href={`/categories/${subCategory.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </MobileMenu>
      )}
    </>
  );
}
