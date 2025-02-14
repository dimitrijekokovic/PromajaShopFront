import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 25px; /* Razmak sa strane */
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => <ProductBox key={product._id} {...product} />)}
    </StyledProductsGrid>
  );
}
