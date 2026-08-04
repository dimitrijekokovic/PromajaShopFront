import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import InfoTab from "@/components/Account/InfoTab";
import { FaInfoCircle, FaBoxOpen, FaCogs, FaHeart } from "react-icons/fa";
import Footer from "@/components/Footer";

const OrdersTab = dynamic(() => import("@/components/Account/OrdersTab"), {
  loading: () => <p>Ucitavanje porudzbina...</p>,
  ssr: false,
});

const SettingsTab = dynamic(() => import("@/components/Account/SettingsTab"), {
  loading: () => <p>Ucitavanje podesavanja...</p>,
  ssr: false,
});

const WishlistTab = dynamic(() => import("@/components/Account/WishlistTab"), {
  loading: () => <p>Ucitavanje liste zelja...</p>,
  ssr: false,
});

const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 44px 24px 36px;
  box-sizing: border-box;

  h1 {
    margin: 0 0 26px;
    line-height: 1.15;
  }

  @media (max-width: 768px) {
    padding: 34px 18px 28px;
  }

  @media (max-width: 480px) {
    padding: 28px 14px 24px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px 32px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 10px;
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const Tab = styled.button`
  padding: 12px;
  background-color: ${({ $active }) => ($active ? "#f97316" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  width: 100%;
  min-height: 40px;
  box-sizing: border-box;

  &:hover {
    background-color: #f97316;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("info");
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userName, setUserName] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");

    if (!token || !userFromStorage || userFromStorage === "undefined") {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userFromStorage);
      const fullName = [parsedUser.firstName, parsedUser.lastName].filter(Boolean).join(" ");

      setUserEmail(parsedUser.email || "Nepoznato");
      setUserPhone(parsedUser.phoneNumber || "Nepoznato");
      setUserName(fullName || parsedUser.name || parsedUser.email || "Nepoznato");
      setRegistrationDate(parsedUser.registrationDate || "Nepoznato");
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <Header />
      <Center>
        <Container>
          <Title>Dobrodošli na Vaš nalog</Title>
          <Tabs>
            <Tab $active={activeTab === "info"} onClick={() => setActiveTab("info")}>
              <FaInfoCircle /> Informacije
            </Tab>
            <Tab $active={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
              <FaBoxOpen /> Porudžbine
            </Tab>
            <Tab $active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
              <FaCogs /> Podešavanja
            </Tab>
            <Tab $active={activeTab === "wishlist"} onClick={() => setActiveTab("wishlist")}>
              <FaHeart /> Lista želja
            </Tab>
          </Tabs>

          <ContentWrapper>
            {activeTab === "info" && (
              <InfoTab
                userEmail={userEmail}
                userPhone={userPhone}
                userName={userName}
                registrationDate={registrationDate}
                handleLogout={handleLogout}
              />
            )}
            {activeTab === "orders" && <OrdersTab userEmail={userEmail} />}
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "wishlist" && <WishlistTab />}
          </ContentWrapper>
        </Container>
      </Center>
      <Footer />
    </>
  );
}
