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

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffa500;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Praćenje trenutnog menija (glavni ili podkategorije)

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
    <DropdownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Trigger>Kategorije</Trigger>
      <DropdownMenu isOpen={isOpen}>
        {currentMenu === "main"
          ? mainCategories.map((mainCategory) => {
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
                      <li>
                        <BackButton onClick={() => setCurrentMenu("main")}>
                          ← Nazad
                        </BackButton>
                      </li>
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
            })
          : null}
      </DropdownMenu>
    </DropdownContainer>
  );
}
