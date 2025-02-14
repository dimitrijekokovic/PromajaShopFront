import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import axios from "axios";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import Modal, { ModalHeader, ModalText, ButtonWrapper, ModalButton } from "@/components/Modal";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px;
    width: 100%;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
`;

const ReviewsSection = styled.div`
  margin-top: 40px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
    max-width: 100%;
    margin-top: 50px;
  }
`;

const SimilarProducts = styled.div`
  margin-top: 50px;
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 15px;
  }
`;

const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

export default function ProductPage({ product, similarProducts }) {
  const { addProduct } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(CartContext);
  const reviewsPerPage = 3;
  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const currentReviews = reviews.slice(firstReviewIndex, lastReviewIndex);

  useEffect(() => {
    axios.get(`/api/reviews?productId=${product._id}`).then((res) => {
      setReviews(res.data);
    });
  }, [product._id]);

  const isOutOfStock = product.stock === 0;

  if (!product) {
    return (
      <Center>
        <h1>Proizvod nije pronađen</h1>
      </Center>
    );
  }

  const breadcrumbItems = [
    { label: "Početna", url: "/" },
    { label: "Proizvodi", url: "/products" },
    { label: product.category?.name || "Nepoznata kategorija", url: `/products?category=${product.category?.slug}` },
    { label: product.title },
  ];

  return (
    <>
      <Header />
      <Center>
        <Breadcrumb items={breadcrumbItems} />
        <ColWrapper>
          <WhiteBox>
            {product.images && product.images.length > 0 ? (
              <ProductImages images={product.images} />
            ) : (
              <p>Slika nije dostupna.</p>
            )}
          </WhiteBox>

          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <p>{product.price},00 RSD</p>
              <Button primary disabled={isOutOfStock} onClick={() => !isOutOfStock && addProduct(product._id)}>
                <CartIcon /> {isOutOfStock ? "Nema na stanju" : "Dodaj u korpu"}
              </Button>
            </PriceRow>
          </div>
        </ColWrapper>

        <ReviewsSection>
          <h2>Ocene kupaca</h2>
          {reviews.length > 0 ? (
            currentReviews.map((review, index) => (
              <ReviewCard key={index} name={review.name} rating={review.rating} comment={review.comment} />
            ))
          ) : (
            <p>Ovaj proizvod trenutno nema recenzija.</p>
          )}
        </ReviewsSection>

        <SimilarProducts>
          <h2>Slični proizvodi</h2>
          <SimilarGrid>
            {similarProducts.map((prod) => (
              <Link key={prod._id} href={`/product/${prod._id}`} passHref>
                <WhiteBox>
                  <img src={prod.images[0]} alt={prod.title} />
                  <h3>{prod.title}</h3>
                  <p>{prod.price},00 RSD</p>
                </WhiteBox>
              </Link>
            ))}
          </SimilarGrid>
        </SimilarProducts>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    await mongooseConnect();
    const { id } = context.query;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return { notFound: true };
    }
    const product = await Product.findById(id).populate({ path: "category", select: "name slug" });
    if (!product) {
      return { notFound: true };
    }
    const similarProducts = await Product.find({ category: product.category?._id, _id: { $ne: product._id } }).limit(4);
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        similarProducts: JSON.parse(JSON.stringify(similarProducts)),
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
