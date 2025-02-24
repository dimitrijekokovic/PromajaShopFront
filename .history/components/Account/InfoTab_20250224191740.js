import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InfoContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px; /* Ograničava širinu na većim ekranima */
  margin: auto; /* Centriranje na svim uređajima */

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  svg {
    color: #f97316;
    font-size: 1.2rem;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%; /* Dugme širine 100% na telefonima */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export default function InfoTab({ userEmail, userPhone, userName }) {
  const router = useRouter(); // Inicijalizacija router-a

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login"); // Preusmeravanje na stranicu za prijavu
  };

  return (
    <InfoContainer>
      <InfoHeader>
        <FaUser />
        Korisnik
      </InfoHeader>
      <InfoRow>
        <span>
          <FaUser /> <b>Ime i prezime:</b>
        </span>
        <span>{userName || "Nepoznato"}</span>
      </InfoRow>
      <InfoRow>
        <span>
          <FaEnvelope /> <b>Email:</b>
        </span>
        <span>{userEmail || "Nepoznato"}</span>
      </InfoRow>
      <InfoRow>
        <span>
          <FaPhone /> <b>Telefon:</b>
        </span>
        <span>{userPhone || "Nepoznato"}</span>
      </InfoRow>

      <LogoutButton onClick={handleLogout}>
        <FaUser /> Odjavi se
      </LogoutButton>
    </InfoContainer>
  );
}