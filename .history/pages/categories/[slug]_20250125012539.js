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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 5;

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

  // Pagination logic
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <Center>
        <div>
          <h1 style={{ textAlign: "center" }}>
            {slug ? capitalizeFirstLetter(slug) : ""}
          </h1>
          {loading ? (
            <p>Učitavanje...</p>
          ) : (
            <>
              <ProductsGrid products={currentProducts} />
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    style={{
                      margin: "0 5px",
                      padding: "10px 15px",
                      backgroundColor: currentPage === i + 1 ? "#FFA500" : "#EEE",
                      border: "1px solid #CCC",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </Center>
      <Footer />
    </>
  );
}
