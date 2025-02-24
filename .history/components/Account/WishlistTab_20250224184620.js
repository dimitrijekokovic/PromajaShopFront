import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ isFavorite }) => (isFavorite ? "#e63946" : "red")};
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  &:hover {
    color: #d62828;
  }
    @media (max-width: 768px) {
    position: absolute;
    right: 10px; /* Pomeri skroz desno */
    top: 50%;
    transform: translateY(-50%); /* Centriraj vertikalno */
  }
`;

const WishlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
`;

const WishlistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 50px;  /* Smanji sliku na telefonima */
    height: 50px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: bold;
`;

export default function WishlistTab() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  // Funkcija za dobijanje trenutnog korisničkog ID-a
  const getUserId = () => {
    return localStorage.getItem("userId") || "guest"; // Default "guest" ako nema prijavljenog korisnika
  };

  // Učitavanje liste želja po korisniku
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { email: "guest" };
    const favoritesKey = `favorites_${user.email}`;
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    setFavorites(storedFavorites);
  }, []);
  
  

  // Dohvat proizvoda sa liste želja
  useEffect(() => {
    async function fetchProducts() {
      if (favorites.length > 0) {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: favorites }),
        });
        
        const data = await response.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, [favorites]);

  if (products.length === 0) {
    return (
      <div>
        <h2>Lista želja</h2>
        <p>Vaša lista želja je prazna.</p>
      </div>
    );
  }

  const handleRemove = (productId) => {
    const user = JSON.parse(localStorage.getItem("user")) || { email: "guest" };
    const favoritesKey = `favorites_${user.email}`;
    const updatedFavorites = favorites.filter((id) => id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setProducts(products.filter((product) => product._id !== productId));
  };
  

  return (
    <div>
      <h2>Lista želja</h2>
      <WishlistContainer>
        {products.map((product) => (
          <WishlistItem key={product._id}>
            <ProductImage src={product.images?.[0] || "/placeholder-image.png"} alt={product.title} />
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>{product.price},00rsd</ProductPrice>
            </ProductInfo>
            <RemoveButton onClick={() => handleRemove(product._id)}><FaHeart /></RemoveButton>
          </WishlistItem>
        ))}
      </WishlistContainer>
    </div>
  );
}
