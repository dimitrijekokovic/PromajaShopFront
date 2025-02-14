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
import ReactImageMagnify from "react-image-magnify";
import Footer from "@/components/Footer";
import axios from "axios";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import Modal, { ModalHeader, ModalText, ButtonWrapper, ModalButton } from "@/components/Modal";

const WhiteBoxx = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  max-width: 200px;
  height: 300px; /* Postavi istu visinu za sve */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    max-height: 150px; /* Ograniči visinu slike */
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: 160px;
    img {
      max-height: 100px;
    }
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  color: #000;
`;

const InfoBox = styled.div`
  margin-top: 20px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  }
`;


const SimilarProducts = styled.div`
  margin-top: 40px;
`;

const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;


const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input,
  textarea,
  select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    font-size: 1rem;
    color: #333;
    width: 100%;
    box-sizing: border-box; /* Dodaje granice unutar dimenzija */
  }

  button {
    background: #F7934B; /* Narandžasta boja */
    color: #fff;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #d97c3c; /* Tamnija narandžasta za hover */
    }

    @media (max-width: 768px) {
    padding: 15px;
    width: 90%;
    button {
      max-width: 100%;
    }
  }
`;



const ReviewList = styled.div`
  margin-top: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  button {
    background: #222222; /* Crna boja */
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #444444; /* Tamno siva boja za hover */
    }

    &.active {
      background: #F7934B; /* Aktivna stranica u narandžastoj boji */
    }
  }
`;
const StyledLink = styled.a`
  text-decoration: none; /* Uklanja podvlačenje */
  color: #000; /* Crna boja */
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    color: #f7934b; /* Narandžasta boja pri hoveru */
  }
`;


export default function ProductPage({ product, similarProducts }) {
  const { addProduct } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // Dodato za modal
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

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      setShowModal(true);
      return;
    }

    const newReview = { productId: product._id, name, comment, rating };
    try {
      await axios.post("/api/reviews", newReview);
      setName("");
      setComment("");
      setRating(1);
      setReviews((prev) => [newReview, ...prev]);
    } catch (error) {
      console.error("Greška pri dodavanju recenzije:", error);
    }
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
              <Price>{product.price},00 RSD</Price>
              <Button
                primary
                disabled={isOutOfStock}
                onClick={() => !isOutOfStock && addProduct(product._id)}
                style={{
                  backgroundColor: isOutOfStock ? "#ccc" : "#F7934B",
    color: isOutOfStock ? "#666" : "#fff",
    border: "none", // Uklanja narandžasti okvir
    cursor: isOutOfStock ? "not-allowed" : "pointer",
    boxShadow: isOutOfStock ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px",
    transition: "all 0.3s ease",
                }}
              >
                <CartIcon /> {isOutOfStock ? "Nema na stanju" : "Dodaj u korpu"}
              </Button>
            </PriceRow>
          </div>
        </ColWrapper>

        <ReviewsSection>
  <h2>Ocene kupaca</h2>
  <ReviewList>
    {reviews.length > 0 ? (
      currentReviews.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          rating={review.rating}
          comment={review.comment}
        />
      ))
    ) : (
      <p>Ovaj proizvod trenutno nema recenzija.</p>
    )}
  </ReviewList>
  {reviews.length > 0 && (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </Pagination>
  )}
</ReviewsSection>

    <ReviewForm onSubmit={handleSubmit}>
  <h3>Napišite recenziju</h3>
  <input
    type="text"
    placeholder="Vaše ime i prezime"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <textarea
    placeholder="Vaš komentar"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    required
  />
  <select
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    required
  >
    <option value="" disabled>
      Odaberite ocenu
    </option>
    {[1, 2, 3, 4, 5].map((num) => (
      <option key={num} value={num}>
        {num} zvezdica
      </option>
    ))}
  </select>
  <button type="submit">Pošalji recenziju</button>
</ReviewForm>

{showModal && (
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ModalHeader>Potrebna registracija</ModalHeader>
            <ModalText>Morate biti registrovani kako biste napisali recenziju.</ModalText>
            <ButtonWrapper>
              <ModalButton primary>
                <a href="/register" style={{ color: "inherit", textDecoration: "none" }}>
                  Registrujte se
                </a>
              </ModalButton>
            </ButtonWrapper>
          </Modal>
        )}


<SimilarProducts>
  <h2>Slični proizvodi</h2>
  <SimilarGrid>
    {similarProducts.map((prod) => (
      <Link key={prod._id} href={`/product/${prod._id}`} passHref legacyBehavior>
        <a style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>
          <WhiteBoxx>
            <img src={prod.images[0]} alt={prod.title} />
            <h3>{prod.title}</h3>
            <Price>{prod.price},00 RSD</Price>
          </WhiteBoxx>
        </a>
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

    const product = await Product.findById(id).populate({
      path: "category",
      select: "name slug",
    });

    if (!product) {
      return { notFound: true };
    }

    const similarProducts = await Product.find({
      category: product.category?._id,
      _id: { $ne: product._id },
    }).limit(4);

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        similarProducts: JSON.parse(JSON.stringify(similarProducts)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
