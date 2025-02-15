// CartContext.js
import { createContext, useEffect, useState, useContext } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null);

  // Učitavanje podataka o korisniku iz localStorage prilikom inicijalizacije
  useEffect(() => {
    if (ls && ls.getItem("user")) {
      try {
        const storedUser = ls.getItem("user");
        if (storedUser !== "undefined") {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.email) {
            setUser(parsedUser); // Postavi korisnika samo ako je validan
          } else {
            console.warn("Neispravan korisnik u localStorage, uklanjam.");
            ls.removeItem("user");
          }
        } else {
          console.warn("Stored user je undefined, preskačem parsing.");
        }
      } catch (error) {
        console.error("Greška prilikom parsiranja korisnika iz localStorage:", error);
        ls.removeItem("user");
      }
    }
  }, []);

  // Učitavanje proizvoda u korpi iz localStorage
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } else {
      ls?.removeItem("cart"); // Ako je korpa prazna, ukloni je iz localStorage
    }
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    ls?.removeItem("cart"); // Obriši korpu iz localStorage
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        user,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}