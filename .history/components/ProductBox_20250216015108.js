import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; // Ikona srca
import { useCart } from "./CartContext"; // Kontekst za korpu
import Image from "next/image";

const ProductWrapper = styled.div`
  position: relative;
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 140px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ isFavorite }) => (isFavorite ? "#e63946" : "#ccc")};
  transition: color 0.3s ease;
  &:hover {
    color: #e63946;
  }
`;

const StockMessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ isLowStock }) =>
    isLowStock ? "#f97316" : "#e63946"};
  color: white;
  font-size: 0.8rem;
  text-align: center;
  padding: 3px 0;
  border-radius: 0 0 10px 10px;
  font-weight:bold;
`;

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "")};
  color: ${({ disabled }) => (disabled ? "#666" : "")};
  border-color: ${({ disabled }) => (disabled ? "#ccc" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  stock,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addProduct } = useCart();

  const url = `/product/${_id}`;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { email: "guest" };
    const favoritesKey = `favorites_${user.email}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    setIsFavorite(favorites.includes(_id));
  }, [_id]);

  const toggleFavorite = () => {
    const user = JSON.parse(localStorage.getItem("user")) || { email: "guest" };
    const favoritesKey = `favorites_${user.email}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    if (favorites.includes(_id)) {
      const updatedFavorites = favorites.filter((id) => id !== _id);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(_id);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 2;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <FavoriteIcon
            isFavorite={isFavorite}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
          >
            <FaHeart />
          </FavoriteIcon>
          <Image src={images[0]} alt={title} layout="intrinsic" objectFit="contain" />
          {(isOutOfStock || isLowStock) && (
            <StockMessageWrapper isLowStock={isLowStock}>
              {isOutOfStock ? "Nema na stanju!" : "Još malo pa nestalo!"}
            </StockMessageWrapper>
          )}
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price},00rsd</Price>
          <StyledButton
            onClick={() => addProduct(_id)}
            primary
            outline
            disabled={isOutOfStock}
          >
            <CartIcon />
          </StyledButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
