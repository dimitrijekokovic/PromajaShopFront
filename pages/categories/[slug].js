import { useRouter } from "next/router";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import { getProductListing } from "@/lib/productListing";

const PRODUCTS_PER_PAGE = 8;

const PageWrapper = styled.div`
  h1 {
    @media (max-width: 768px) {
      text-align: center;
      padding: 0;
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
      background-color: #f59051;
      color: #fff;

      @media (max-width: 768px) {
        background-color: #f58040;
      }
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

export default function CategoryPage({
  products,
  page,
  totalPages,
  categoryName,
  slug,
}) {
  const router = useRouter();

  const handlePageChange = (nextPage) => {
    if (nextPage > 0 && nextPage <= totalPages && nextPage !== page) {
      const query = nextPage > 1 ? { page: nextPage } : {};

      router.push(
        { pathname: `/categories/${slug}`, query },
        undefined,
        { scroll: true }
      );
    }
  };

  return (
    <>
      <Header />
      <Center>
        <PageWrapper>
          <h1>{categoryName}</h1>
          {products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <EmptyState>Nema proizvoda u ovoj kategoriji.</EmptyState>
          )}
          {totalPages > 1 && (
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={page === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </Pagination>
          )}
        </PageWrapper>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params, query, res }) {
  const slug = typeof params?.slug === "string" ? params.slug : "";

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

  const listing = await getProductListing({
    categorySlug: slug,
    page: query.page,
    limit: PRODUCTS_PER_PAGE,
  });

  return {
    props: {
      products: listing.products,
      page: listing.page,
      totalPages: listing.totalPages,
      categoryName: listing.category?.name || slug,
      slug,
    },
  };
}
