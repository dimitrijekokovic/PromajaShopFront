import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import InfoTab from "@/components/Account/InfoTab";
import OrdersTab from "@/components/Account/OrdersTab";
import SettingsTab from "@/components/Account/SettingsTab";
import WishlistTab from "@/components/Account/WishlistTab";
import axios from "axios";
import { FaInfoCircle, FaBoxOpen, FaCogs, FaHeart } from "react-icons/fa";
import Footer from "@/components/Footer";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  background-color: ${(props) => (props.active ? "#f97316" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
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
  max-width: 180px;
  margin-bottom: 5px;

  &:hover {
    background-color: #f97316;
    color: #fff;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("info");
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userName, setUserName] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; 
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage && userFromStorage !== "undefined") {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUserEmail(parsedUser.email || "Nepoznato");
        setUserPhone(parsedUser.phoneNumber || "Nepoznato");
        setUserName(`${parsedUser.firstName} ${parsedUser.lastName}` || "Nepoznato");
        setRegistrationDate(parsedUser.registrationDate || "Nepoznato");
      } catch (e) {
        console.error("Neispravan JSON u localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/api/orders?email=${userEmail}`);
          setOrders(response.data.orders || []);
        } catch (error) {
          console.error("Greška prilikom povlačenja porudžbina:", error);
        }
      };
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <>
      <Header />
      <Center>
        <Container>
          <Title>Dobrodošli na Vaš nalog</Title>
          <Tabs>
            <Tab active={activeTab === "info"} onClick={() => handleTabChange("info")}>
              <FaInfoCircle /> Informacije
            </Tab>
            <Tab active={activeTab === "orders"} onClick={() => handleTabChange("orders")}>
              <FaBoxOpen /> Porudžbine
            </Tab>
            <Tab active={activeTab === "settings"} onClick={() => handleTabChange("settings")}>
              <FaCogs /> Podešavanja
            </Tab>
            <Tab active={activeTab === "wishlist"} onClick={() => handleTabChange("wishlist")}>
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
            {activeTab === "orders" && <OrdersTab orders={orders} userEmail={userEmail} />}
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "wishlist" && <WishlistTab />}
          </ContentWrapper>
        </Container>
      </Center>
      <Footer />
    </>
  );
}
