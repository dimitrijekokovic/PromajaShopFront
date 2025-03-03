import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import AuthLinks from "@/components/AuthLinks";

// API URL iz .env.local fajla
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Stilizovane komponente
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

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
  margin-bottom: 1rem;

  &:hover {
    background-color: #e56b00;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "", // Ispravljeno: umesto 'phone', koristi 'phoneNumber'
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset greške

    try {
      const response = await axios.post(`${API_URL}/api/customAuth/register`, formData);

      if (response && response.data) {
        const user = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber, // Ispravljeno
          email: formData.email,
          registrationDate: new Date().toISOString(),
        };

        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));

        router.push("/login"); // Preusmeravanje nakon registracije
      } else {
        setError("Greška: Prazan odgovor sa servera.");
      }
    } catch (err) {
      console.error("Greška prilikom registracije:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Greška na serveru.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Registracija</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            placeholder="Ime"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Prezime"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="phoneNumber" // Ispravljeno
            placeholder="Broj telefona"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Lozinka"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Registracija..." : "Registruj se"}
          </Button>
          {error && <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{error}</p>}
        </form>
        <AuthLinks type="register" />
      </FormWrapper>
    </Container>
  );
}
