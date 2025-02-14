import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fetchProductsByCategory } from "@/utils/api";
import ProductsGrid from "@/components/ProductsGrid";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";

const PageWrapper = styled.div`
  h1 {
    text-align: left;
    padding: 0 15px;
    font-size: 44px;

    @media (max-width: 768px) {
      text-align: center;
      padding: 0;
      font-size: 20px;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 10px 15px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    &:hover {
      background-color: #ddd;
    }

    &.active {
      background-color: #F3934D; /* Svetlija narandžasta */
      color: #fff;

      @media (max-width: 768px) {
        background-color: #F3934D; /* Još svetlija narandžasta za mobilne uređaje */
      }
    }
  }
`;

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const productsPerPage = isMobile ? 5 : 8;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchProductsByCategory(slug)
        .then((data) => setProducts(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
        <PageWrapper>
          <h1>{slug ? capitalizeFirstLetter(slug) : ""}</h1>
          {loading ? (
            <p>Učitavanje...</p>
          ) : (
            <>
              <ProductsGrid products={currentProducts} />
              <Pagination>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </Pagination>
            </>
          )}
        </PageWrapper>
      </Center>
      <Footer />
    </>
  );
}
