// CartContext.js
import { createContext, useEffect, useState, useContext } from "react";

export const CartContext = createContext({});

function getStockLimit(product) {
  const stock = Number(product?.stock);
  return Number.isFinite(stock) ? Math.max(0, stock) : Infinity;
}

function buildSyncedCartIds(cartIds, products) {
  const productsById = new Map(products.map((product) => [product._id, product]));
  const counts = {};
  const syncedIds = [];

  cartIds.forEach((id) => {
    const product = productsById.get(id);

    if (!product) {
      return;
    }

    const currentQuantity = counts[id] || 0;

    if (currentQuantity >= getStockLimit(product)) {
      return;
    }

    counts[id] = currentQuantity + 1;
    syncedIds.push(id);
  });

  return syncedIds;
}

function arraysMatch(first, second) {
  if (first.length !== second.length) return false;
  return first.every((item, index) => item === second[index]);
}

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
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
  }, [ls]);

  // Učitavanje proizvoda u korpi iz localStorage
  useEffect(() => {
    if (!ls) {
      setCartLoaded(true);
      return;
    }

    try {
      const storedCart = ls.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCartProducts(Array.isArray(parsedCart) ? parsedCart : []);
    } catch (error) {
      console.error("Greska prilikom parsiranja korpe iz localStorage:", error);
      ls.removeItem("cart");
      setCartProducts([]);
    } finally {
      setCartLoaded(true);
    }
  }, [ls]);

  useEffect(() => {
    if (!cartLoaded) return;

    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } else {
      ls?.removeItem("cart"); // Ako je korpa prazna, ukloni je iz localStorage
    }
  }, [cartProducts, cartLoaded, ls]);

  useEffect(() => {
    if (!cartLoaded || !cartProducts?.length) return;

    let cancelled = false;

    async function syncCartWithStock() {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: [...new Set(cartProducts)] }),
        });

        if (!response.ok) return;

        const products = await response.json();
        const syncedCartProducts = buildSyncedCartIds(
          cartProducts,
          Array.isArray(products) ? products : []
        );

        if (!cancelled && !arraysMatch(cartProducts, syncedCartProducts)) {
          setCartProducts(syncedCartProducts);
        }
      } catch (error) {
        console.error("Greska prilikom sinhronizacije korpe:", error);
      }
    }

    syncCartWithStock();

    return () => {
      cancelled = true;
    };
  }, [cartProducts, cartLoaded]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function addProductWithLimit(productId, stock) {
    const maxStock = Number(stock);

    if (!Number.isFinite(maxStock)) {
      addProduct(productId);
      return;
    }

    if (maxStock <= 0) {
      return;
    }

    setCartProducts((prev) => {
      const currentQuantity = prev.filter((id) => id === productId).length;

      if (currentQuantity >= maxStock) {
        return prev;
      }

      return [...prev, productId];
    });
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
        addProductWithLimit,
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
