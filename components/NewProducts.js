import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 30px 0 20px;
  font-weight: bold;
  text-align: left;

  @media (max-width: 480px) {
    text-align: center;
    font-size: 1.8rem;
    margin: 20px 0;
  }
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Novo u Ponudi</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
