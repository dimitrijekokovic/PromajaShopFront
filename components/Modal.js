import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.94);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.22s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${popIn} 0.28s cubic-bezier(0.2, 0.9, 0.2, 1.08);
`;

export const ModalHeader = styled.h2`
  margin: 0 28px;
  color: #333;
  line-height: 1.25;
`;

export const ModalText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 15px 0;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  background: ${({ primary }) => (primary ? "#F69450" : "#F69150")};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #d97c3c;
  }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;

    &:hover {
    color: #ff0000;
    }
`;

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
}
