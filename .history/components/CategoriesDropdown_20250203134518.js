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
  padding: 10px 15px;

  &:hover {
    color: #fff;
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
  width: 200px;
  display: none;

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

  return (
    <>
      <DropdownContainer
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Trigger>Kategorije</Trigger>
        <DropdownMenu isOpen={isOpen}>
          {mainCategories.map((mainCategory) => {
            const subCategories = categories.filter(
              (cat) => cat.parent?._id === mainCategory._id
            );

            return (
              <li key={mainCategory._id}>
                <Link href={`/categories/${mainCategory.slug}`}>
                  {mainCategory.name}
                </Link>
                {subCategories.length > 0 && (
                  <SubMenu>
                    {subCategories.map((subCategory) => (
                      <li key={subCategory._id}>
                        <Link href={`/categories/${subCategory.slug}`}>
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </SubMenu>
                )}
              </li>
            );
          })}
        </DropdownMenu>
      </DropdownContainer>

      {showMobileMenu && (
        <MobileMenu>
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
      )}
    </>
  );
}
