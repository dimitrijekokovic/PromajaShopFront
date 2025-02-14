import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchProductsByCategory } from "@/utils/api";
import ProductsGrid from "@/components/ProductsGrid";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchProductsByCategory(slug)
        .then((data) => setProducts(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Header />
      <Center>
        <div>
          <h1>{slug ? capitalizeFirstLetter(slug) : ""}</h1>
          {loading ? (
            <p>Učitavanje...</p>
          ) : (
            <ProductsGrid products={products} />
          )}
        </div>
      </Center>
      <Footer />
    </>
  );
}
