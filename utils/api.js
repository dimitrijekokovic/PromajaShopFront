import axios from "axios";

export async function fetchProductsByCategory(categorySlug) {
  const response = await fetch(`/api/products?category=${categorySlug}`);
  if (!response.ok) {
    throw new Error("Greška prilikom dohvatanja proizvoda");
  }
  const data = await response.json();
  return data;
}

