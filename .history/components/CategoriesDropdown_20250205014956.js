import styled from "styled-components";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  text-align: left;
  width: 100%;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #222;
  z-index: 100;
  overflow-y: auto;
  padding: 20px;
`;

const BackButton = styled.button`
  background: #f39052;
  border: none;
  color: #222;
  font-size: 16px;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #444;
    color: #fff;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      color: #f39052;
    }
  }
`;

export default function CategoriesDropdown() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: "Varalice",
      subcategories: ["Vobleri", "Twitchevi", "Kašike", "Glavinjare", "Silikonci"],
    },
    { name: "Majice", subcategories: [] },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleBack = () => {
    if (activeCategory) {
      setActiveCategory(null);
    } else {
      setIsPanelOpen(false);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsPanelOpen(true)}>Kategorije</DropdownButton>
      {isPanelOpen && (
        <Panel>
          <BackButton onClick={handleBack}>Nazad</BackButton>
          {!activeCategory ? (
            <CategoryList>
              {categories.map((category) => (
                <li key={category.name} onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </li>
              ))}
            </CategoryList>
          ) : (
            <CategoryList>
              {activeCategory.subcategories.map((subcategory) => (
                <li key={subcategory}>{subcategory}</li>
              ))}
            </CategoryList>
          )}
        </Panel>
      )}
    </DropdownContainer>
  );
}
