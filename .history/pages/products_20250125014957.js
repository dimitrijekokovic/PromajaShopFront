import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
      background-color: #f59051;
      color: #fff;

      @media (max-width: 768px) {
        background-color: #f58040;
      }
    }

    &.dots {
      background-color: transparent;
      border: none;
      cursor: default;
      padding: 10px; /* Dodatni prostor za tačkice */
    }
  }

  @media (min-width: 1024px) {
    button {
      margin: 0 8px; /* Veći razmaci na desktopu */
      padding: 12px 20px; /* Veći dugmići na desktopu */
      font-size: 16px;
    }
  }
`;


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { category } = router.query;

  const productsPerPage = isMobile ? 5 : 8;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (category) {
      axios.get(`/api/products?category=${category}`).then((res) => {
        setProducts(res.data);
        setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
      });
    } else {
      axios.get("/api/products").then((res) => {
        setProducts(res.data);
        setCategoryName("Svi Proizvodi");
      });
    }
  }, [category]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 1) pages.push(1);
      if (currentPage > 2) pages.push("...");
      pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push("...");
      if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <Header />
      <Center>
        <Title>{categoryName}</Title>
        <ProductsGrid products={currentProducts} />
        <Pagination>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#171; Nazad
          </button>
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <button key={index} className="dots">
                ...
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Napred &#187;
          </button>
        </Pagination>
      </Center>
      <Footer />
    </>
  );
}
