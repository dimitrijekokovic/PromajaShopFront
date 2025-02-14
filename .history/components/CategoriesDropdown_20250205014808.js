import { useState } from "react";
import styled from "styled-components";

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

const MobilePanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #222;
  z-index: 20;
  padding: 20px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  color: white;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #f7934b;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CategoryItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #f7934b;
  }
`;

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const mainCategories = ["Vobleri", "Twitchevi", "Kašike"];
  const subCategories = {
    Vobleri: ["Crveni", "Plavi", "Zeleni"],
    Twitchevi: ["Dugi", "Kratki"],
    Kašike: ["Metalne", "Plastične"],
  };

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <DropdownContainer>
      <Trigger onClick={() => setIsOpen(true)}>Kategorije</Trigger>
      <MobilePanel isOpen={isOpen}>
        {activeCategory ? (
          <>
            <BackButton onClick={() => setActiveCategory(null)}>
              Nazad
            </BackButton>
            {subCategories[activeCategory].map((sub, index) => (
              <CategoryItem key={index}>{sub}</CategoryItem>
            ))}
          </>
        ) : (
          mainCategories.map((cat, index) => (
            <CategoryItem
              key={index}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryItem>
          ))
        )}
      </MobilePanel>
    </DropdownContainer>
  );
}
