import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 100%;
  padding: 44px 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 18px;
    padding: 26px 0;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  text-align: center;
  line-height: 1.25;
`;

const FormWrapper = styled.form`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 32px 38px;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 464px;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 22px 18px;
    max-width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    border-color: #ff7a00;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ disabled }) => (disabled ? "#d1d5db" : "#ff7a00")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease, transform 0.15s ease;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d1d5db" : "#e56b00")};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(1px)")};
  }
`;

const Message = styled.p`
  width: min(464px, 100%);
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: ${({ $success }) => ($success ? "#ecfdf5" : "#fef2f2")};
  color: ${({ $success }) => ($success ? "#047857" : "#b91c1c")};
  text-align: center;
  font-weight: 600;
  box-sizing: border-box;
`;

export default function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("Nova lozinka mora imati najmanje 6 karaktera.");
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Lozinke se ne poklapaju.");
      setIsSuccess(false);
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post("/api/customAuth/changePassword", {
        token,
        email: storedUser?.email,
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Lozinka je uspešno promenjena.");
        setIsSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Greška prilikom promene lozinke.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Podešavanja naloga</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Trenutna lozinka"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Nova lozinka"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Potvrdi novu lozinku"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Čuvanje..." : "Promeni lozinku"}
        </Button>
      </FormWrapper>
      {message && <Message $success={isSuccess}>{message}</Message>}
    </Container>
  );
}
