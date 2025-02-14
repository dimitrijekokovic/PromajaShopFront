import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #222;
  color: #fff;
`;

const BackButton = styled.div`
  cursor: pointer;
  color: #f7934b;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryItem = styled.div`
  cursor: pointer;
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #f7934b;
  }
`;

export default function CategoriesDropdown({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent);
  const subCategories = categories.filter(
    (cat) => cat.parent?._id === currentCategory?._id
  );

  return (
    <DropdownContainer>
      {currentCategory ? (
        <>
          <BackButton onClick={() => setCurrentCategory(null)}>
            ← Nazad
          </BackButton>
          <CategoryItem>
            <Link href={`/categories/${currentCategory.slug}`}>
              {currentCategory.name} (sve)
            </Link>
          </CategoryItem>
          {subCategories.map((subCategory) => (
            <CategoryItem key={subCategory._id}>
              <Link href={`/categories/${subCategory.slug}`}>
                {subCategory.name}
              </Link>
            </CategoryItem>
          ))}
        </>
      ) : (
        mainCategories.map((mainCategory) => (
          <CategoryItem
            key={mainCategory._id}
            onClick={() => setCurrentCategory(mainCategory)}
          >
            {mainCategory.name}
          </CategoryItem>
        ))
      )}
    </DropdownContainer>
  );
}
