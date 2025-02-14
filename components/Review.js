import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ReviewsContainer = styled.div`
  margin-top: 20px;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    axios.get(`/api/reviews?productId=${productId}`).then((res) => {
      setReviews(res.data);
    });
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { productId, name, comment, rating };
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

  return (
    <ReviewsContainer>
      <h2>Dodaj recenziju</h2>
      <ReviewForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vaše ime"
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
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} zvezdica
            </option>
          ))}
        </select>
        <button type="submit">Pošalji</button>
      </ReviewForm>

      <ReviewList>
        <h3>Recenzije:</h3>
        {reviews.length === 0 && <p>Nema dostupnih recenzija za ovaj proizvod.</p>}
        {reviews.map((review, index) => (
          <div key={index}>
            <strong>{review.name}</strong> ({review.rating} zvezdica)
            <p>{review.comment}</p>
          </div>
        ))}
      </ReviewList>
    </ReviewsContainer>
  );
}
