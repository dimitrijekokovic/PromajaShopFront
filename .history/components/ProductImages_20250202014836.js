import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const BigImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #f9f9f9;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
    text-align: center;
  }
`;

const BigImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  display: block;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;

  &:hover {
    background: #f7934b;
  }

  ${({ direction }) => direction === "left" && `left: 10px;`}
  ${({ direction }) => direction === "right" && `right: 10px;`}
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #f7934b;
  }

  ${({ active }) =>
    active &&
    `
    border-color: #f7934b;
  `}
`;

const ProductImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4; // Number of thumbnails to display at a time

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getVisibleThumbnails = () => {
    if (images.length <= visibleCount) {
      return images; // If there are less than or equal to 4 images, show all
    }

    // For more than 4 images, show a sliding window of 4 images
    const start = Math.floor(currentIndex / visibleCount) * visibleCount;
    return images.slice(start, start + visibleCount);
  };

  return (
    <Container>
      <BigImageContainer>
        {images.length > 1 && (
          <ArrowButton direction="left" onClick={handlePrev}>
            <FaArrowLeft />
          </ArrowButton>
        )}
<ImageWrapper>
  <StyledImage src={images[selectedImage]} alt="Product image" />
</ImageWrapper>        {images.length > 1 && (
          <ArrowButton direction="right" onClick={handleNext}>
            <FaArrowRight />
          </ArrowButton>
        )}
      </BigImageContainer>
      <ThumbnailsContainer>
        {getVisibleThumbnails().map((image, index) => {
          const realIndex = (Math.floor(currentIndex / visibleCount) * visibleCount) + index;
          return (
            <Thumbnail
              key={realIndex}
              src={image}
              alt={`Thumbnail ${realIndex}`}
              active={realIndex === currentIndex}
              onClick={() => setCurrentIndex(realIndex)}
            />
          );
        })}
      </ThumbnailsContainer>
    </Container>
  );
};

export default ProductImages;
