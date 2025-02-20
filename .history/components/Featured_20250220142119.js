import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Image from "next/image";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 40px 25px;

  @media (max-width: 768px) {
    padding: 20px 25px;
  }
`;
const Title = styled.h1`
  color: #f39052;
  margin: 0;
  font-weight: bold;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const Desc = styled.p`
  color: #aaaaaa;
  font-size: 0.9rem;
  margin: 15px 0 20px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    text-align: center;
  }
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 70px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const ImageWrapper = styled.div`
position: relative;
  width: 300px;  /* Postavi željenu širinu */
  height: 300px; /* Postavi željenu visinu */
  img {
    border-radius: 50%;
    max-width: 100%;

    @media (max-width: 768px) {
      max-width: 70%;
      margin: 0 auto;
    }
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <ImageWrapper>
              <Image
                src="https://dimitrije-next-ecommerce.s3.amazonaws.com/1739893983845.jpg"
                alt="image"
                width={300}
                height={300}
                
              />
            </ImageWrapper>
          </Column>
          <Column>
            <div>
            <Title>{"\"PF Vobler\" – Tvoja prednost na vodi"}</Title>
            <Desc>
                Predstavljamo vam <b>PF Vobler</b> – prvu univerzalnu varalicu iz naše <b>PromajaFishing</b> kolekcije,
                dizajniranu s ljubavlju prema ribolovu i pažnjom na svaki detalj. Ručno izrađena, ova varalica kombinuje
                preciznost, kvalitet i jedinstveni dizajn, čineći je idealnim izborom za sve strastvene ribolovce.
              </Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/products/${product._id}`} outline={1} white={1} size="l">
                  Saznaj više
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Dodaj u korpu
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
