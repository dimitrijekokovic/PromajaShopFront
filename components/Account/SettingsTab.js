import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FormWrapper = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #ff7a00;
    outline: none;
  }
`;

const Button = styled.button`
  width: 90%;
  padding: 0.75rem;
  background-color: #ff7a00;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e56b00;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${({ success }) => (success ? "green" : "red")};
`;

export default function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Lozinke se ne poklapaju!");
      setIsSuccess(false);
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Uzimanje tokena iz localStorage
      const response = await axios.post("/api/customAuth/changePassword", {
        token,
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Lozinka je uspešno promenjena!");
        setIsSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Greška prilikom promene lozinke.");
      setIsSuccess(false);
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
        <Button type="submit">Promeni lozinku</Button>
      </FormWrapper>
      {message && <Message success={isSuccess}>{message}</Message>}
    </Container>
  );
}
