import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 30px 20px;
  font-weight: bold;
  text-align: left;

  @media (max-width: 480px) {
    text-align: center;
    font-size: 1.8rem;
    margin: 20px 0;
  }
`;

export default function LurePackages({ products }) {
  return (
    <Center>
      <Title>Paketi varalica</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
