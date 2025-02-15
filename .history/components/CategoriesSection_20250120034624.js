import styled from "styled-components";
import Center from "./Center";
import { useRouter } from "next/router";

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-areas:
    "cat1 cat1 cat2 cat3"
    "cat4 cat5 cat6 cat6";
  grid-gap: 20px;
  margin: 25px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "cat1 cat2"
      "cat3 cat4"
      "cat5 cat6";
    padding: 0 25px; /* Uvlačenje za mobilne uređaje */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "cat1"
      "cat2"
      "cat3"
      "cat4"
      "cat5"
      "cat6";
  }
`;

const CategoryCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  img {
    width: auto;
    height: 150px;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 10px;

    @media (max-width: 480px) {
      height: 80px;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
    font-weight: bold;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CategoryItem = styled(CategoryCard)`
  ${({ area }) => area && `grid-area: ${area};`}
`;

export default function CategoriesSection({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <Center>
      <SectionTitle>Kategorije proizvoda</SectionTitle>
      <CategoriesContainer>
        <CategoryItem area="cat1" onClick={() => handleCategoryClick("vobleri")}>
          <img src="/vobleri.png" alt="Vobleri" />
          <h3>Vobleri</h3>
        </CategoryItem>
        <CategoryItem area="cat2" onClick={() => handleCategoryClick("twitchevi")}>
          <img src="/twitchevi.png" alt="Twitchevi" />
          <h3>Twitchevi</h3>
        </CategoryItem>
        <CategoryItem area="cat3" onClick={() => handleCategoryClick("kasike")}>
          <img src="/kasike.png" alt="Kašike" />
          <h3>Kašike</h3>
        </CategoryItem>
        <CategoryItem area="cat4" onClick={() => handleCategoryClick("silikonci")}>
          <img src="/silikonci.png" alt="Silikonci" />
          <h3>Silikonci</h3>
        </CategoryItem>
        <CategoryItem area="cat5" onClick={() => handleCategoryClick("majice")}>
          <img src="/majice.png" alt="Majice" />
          <h3>Majice</h3>
        </CategoryItem>
        <CategoryItem area="cat6" onClick={() => handleCategoryClick("glavinjare")}>
          <img src="/glavinjare.png" alt="Glavinjare" />
          <h3>Glavinjare</h3>
        </CategoryItem>
      </CategoriesContainer>
    </Center>
  );
}
