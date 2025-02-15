import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: ${(props) => (props.primary ? "#F7934B" : "#ccc")};
  color: ${(props) => (props.primary ? "white" : "#333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${(props) => (props.primary ? "#d97c3c" : "#bbb")};
  }
`;

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Potrebna registracija</ModalHeader>
        <ModalText>Morate biti prijavljeni ili registrovani da biste nastavili sa ovom radnjom.</ModalText>
        <ButtonWrapper>
          <ModalButton onClick={onClose}>Zatvori</ModalButton>
          <ModalButton primary>
          <Link href="/register">
            <a href="/register" style={{ color: "inherit", textDecoration: "none" }}>
              Registrujte se
            </a>
            </Link>
          </ModalButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
