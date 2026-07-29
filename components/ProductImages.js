import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const BigImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    aspect-ratio: 1.12 / 1;
    border-radius: 10px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(34, 34, 34, 0.58);
  border: none;
  border-radius: 50%;
  color: #fff;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: #f7934b;
    transform: translateY(-50%) scale(1.04);
  }

  ${({ direction }) => direction === "left" && `left: 10px;`}
  ${({ direction }) => direction === "right" && `right: 10px;`}
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Thumbnail = styled(Image)`
  width: 72px;
  height: 72px;
  object-fit: contain;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  background: #fff;
  padding: 7px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #f7934b;
  }

  ${({ $active }) =>
    $active &&
    `
    border-color: #f7934b;
    box-shadow: 0 6px 16px rgba(247, 147, 75, 0.22);
  `}

  @media (max-width: 768px) {
    width: 62px;
    height: 62px;
    border-radius: 9px;
    padding: 6px;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 28px 34px;
  overflow: hidden;

  @media (max-width: 768px) {
    inset: 20px 22px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
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
  <StyledImage
    src={images[currentIndex]}
    alt="Product image"
    fill
    priority
    sizes="(max-width: 768px) 88vw, 420px"
  />
</ImageWrapper>
        {images.length > 1 && (
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
              width={120}
              height={120}
              sizes="72px"
              $active={realIndex === currentIndex}
              onClick={() => setCurrentIndex(realIndex)}
            />
          );
        })}
      </ThumbnailsContainer>
    </Container>
  );
};

export default ProductImages;
