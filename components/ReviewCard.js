import styled from "styled-components";

const ReviewCardWrapper = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewerName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px; /* Manji razmak između zvezdica */
  margin-bottom: 10px;

  span {
    font-size: 1.5rem; /* Veće zvezdice */
    color: #ffd700; /* Zlatna boja za popunjene zvezdice */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); /* Blaga senka za vidljivost */
  }

  span.empty {
    color: #ddd; /* Svetlo siva za prazne zvezdice */
  }
`;


const ReviewText = styled.p`
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export default function ReviewCard({ name, rating, comment }) {
  return (
    <ReviewCardWrapper>
      <ReviewHeader>
        <ReviewerName>{name}</ReviewerName>
        <ReviewRating>
  {Array.from({ length: rating }, (_, index) => (
    <span key={index}>★</span>
  ))}
  {Array.from({ length: 5 - rating }, (_, index) => (
    <span key={index} className="empty">
      ★
    </span>
  ))}
</ReviewRating>
      

    </ReviewHeader>
      <ReviewText>{comment}</ReviewText>
    </ReviewCardWrapper>
  );
}
