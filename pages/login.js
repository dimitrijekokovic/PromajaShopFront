import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/components/Header";
import AuthLinks from "@/components/AuthLinks";
import { jwtDecode } from "jwt-decode";
import Footer from "@/components/Footer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 260px);
  padding: 48px 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 28px 0;
  }
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff7a00;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff7a00;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &:hover {
    background-color: #e56b00;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setError("");

    try {
      const response = await fetch("/api/customAuth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        const { token } = data;
        const decoded = jwtDecode(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decoded));

        window.dispatchEvent(new Event("storage"));
        router.push("/");
      } else {
        setError(data.message || "Doslo je do greske. Pokusajte ponovo.");
      }
    } catch {
      setError("Greska na serveru.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <FormWrapper>
          <Title>Prijava</Title>
          <form onSubmit={handleSubmit}>
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
              {loading ? "Prijavljivanje..." : "Prijavi se"}
            </Button>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          </form>
          <AuthLinks type="login" />
        </FormWrapper>
      </Container>
      <Footer />
    </>
  );
}
