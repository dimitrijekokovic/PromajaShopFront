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

    a {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #f7934b;
      }
    }
  }
`;

export default function CategoriesDropdownDesktop() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const renderSubMenu = (parentId) => {
    const subCategories = categories.filter((cat) => cat.parent?._id === parentId);
    if (subCategories.length === 0) return null;

    return (
      <SubMenu>
        {subCategories.map((subCategory) => (
          <li key={subCategory._id}>
            <Link href={`/categories/${subCategory.slug}`}>{subCategory.name}</Link>
          </li>
        ))}
      </SubMenu>
    );
  };

  return (
    <DropdownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Trigger>Kategorije</Trigger>
      <DropdownMenu isOpen={isOpen}>
        {mainCategories.map((mainCategory) => (
          <li key={mainCategory._id}>
            <Link href={`/categories/${mainCategory.slug}`}>
              {mainCategory.name}
            </Link>
            {renderSubMenu(mainCategory._id)}
          </li>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
