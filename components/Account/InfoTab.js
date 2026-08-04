import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InfoContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-bottom: 20px;
  padding: 22px 20px 20px;
  width: 100%;
  max-width: 440px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 18px 16px;
    max-width: 100%;
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
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 12px 14px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
    gap: 12px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  span {
    min-width: 0;
  }

  span:first-child {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  span:last-child {
    text-align: right;
    overflow-wrap: anywhere;
  }

  @media (max-width: 420px) {
    span:last-child {
      text-align: left;
      padding-left: 26px;
    }
  }

  svg {
    color: #f97316;
    font-size: 1.2rem;
    flex-shrink: 0;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;

  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export default function InfoTab({ userEmail, userPhone, userName }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
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
