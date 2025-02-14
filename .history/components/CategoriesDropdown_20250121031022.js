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
  background-color: #333;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  z-index: 50;
`;

const BackButton = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #f7934b;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  font-size: 16px;
  margin: 10px 0;

  &:hover {
    color: #f7934b;
  }
`;

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const handleBackClick = () => {
    setCurrentCategory(null);
  };

  return (
    <DropdownContainer>
      <Trigger onClick={() => setIsMenuOpen(true)}>Kategorije</Trigger>
      {isMenuOpen && (
        <MobileMenu>
          {currentCategory ? (
            <>
              <BackButton onClick={handleBackClick}>← Nazad</BackButton>
              <CategoryLink
  href={currentCategory?.slug ? `/categories/${currentCategory.slug}` : "#"}
>
  {currentCategory.name} (Sve)
</CategoryLink>
{categories
  .filter((cat) => cat.parent?._id === currentCategory._id)
  .map((subCategory) => (
    <CategoryLink
      key={subCategory._id}
      href={subCategory.slug ? `/categories/${subCategory.slug}` : "#"}
    >
      {subCategory.name}
    </CategoryLink>
  ))}

            </>
          ) : (
            mainCategories.map((mainCategory) => (
              <CategoryLink
                key={mainCategory._id}
                onClick={() => handleCategoryClick(mainCategory)}
              >
                {mainCategory.name}
              </CategoryLink>
            ))
          )}
        </MobileMenu>
      )}
    </DropdownContainer>
  );
}
