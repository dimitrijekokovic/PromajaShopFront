import { useRouter } from "next/router";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductListing } from "@/lib/productListing";

const PRODUCTS_PER_PAGE = 8;

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

const EmptyState = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 32px 20px;
  text-align: center;
  color: #444;
  margin-bottom: 40px;
`;


export default function ProductsPage({
  products,
  page,
  totalPages,
  categoryName,
  searchQuery,
}) {
  const router = useRouter();
  const { category, search } = router.query;
  const categoryQuery = typeof category === "string" ? category : "";
  const searchQueryParam = typeof search === "string" ? search : "";

  const pageTitle = searchQuery
    ? `Pretraga: "${searchQuery}"`
    : categoryName;

  const handlePageChange = (nextPage) => {
    if (nextPage > 0 && nextPage <= totalPages && nextPage !== page) {
      const query = {};

      if (categoryQuery) query.category = categoryQuery;
      if (searchQueryParam) query.search = searchQueryParam;
      if (nextPage > 1) query.page = nextPage;

      router.push({ pathname: "/products", query }, undefined, { scroll: true });
    }
  };

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page > 1) pages.push(1);
      if (page > 2) pages.push("...");
      pages.push(page);
      if (page < totalPages - 1) pages.push("...");
      if (page < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <Header />
      <Center>
        <Title>{pageTitle}</Title>
        {products.length > 0 ? (
          <ProductsGrid products={products} />
        ) : (
          <EmptyState>Nema proizvoda za ovu pretragu.</EmptyState>
        )}
        {totalPages > 1 && (
          <Pagination>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              &#171; Nazad
            </button>
            {getVisiblePages().map((visiblePage, index) =>
              visiblePage === "..." ? (
                <button key={index} className="dots">
                  ...
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(visiblePage)}
                  className={page === visiblePage ? "active" : ""}
                >
                  {visiblePage}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Napred &#187;
            </button>
          </Pagination>
        )}
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query, res }) {
  const categorySlug = typeof query.category === "string" ? query.category : "";
  const searchQuery = typeof query.search === "string" ? query.search.trim() : "";
  const requestedPage = query.page;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

  const listing = await getProductListing({
    categorySlug,
    search: searchQuery,
    page: requestedPage,
    limit: PRODUCTS_PER_PAGE,
  });

  return {
    props: {
      products: listing.products,
      page: listing.page,
      totalPages: listing.totalPages,
      categoryName: listing.category?.name || (categorySlug ? categorySlug : "Svi Proizvodi"),
      searchQuery,
    },
  };
}
