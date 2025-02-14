import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsCalendar3, BsBag } from "react-icons/bs";
import axios from "axios";

const OrderCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f97316;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const OrderDetails = styled.div`
  overflow: hidden;
  height: ${({ isOpen, refHeight }) => (isOpen ? `${refHeight}px` : "0")};
  transition: height 0.3s ease;
  background: #f9f9f9;
  border-radius: 10px;
  padding: ${({ isOpen }) => (isOpen ? "15px" : "0 15px")};
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function OrdersTab({ userEmail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrders, setOpenOrders] = useState({});
  const contentRefs = useRef({});

  useEffect(() => {
    if (!userEmail) {
      setError("Email korisnika nije dostupan.");
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders", {
          params: { email: userEmail },
        });
        setOrders(response.data.orders || []);
      } catch (err) {
        console.error("Greška prilikom učitavanja porudžbina:", err);
        setError("Nije moguće učitati porudžbine.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userEmail]);

  const toggleOrderDetails = (orderId) => {
    setOpenOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  if (loading) {
    return <p>Učitavanje porudžbina...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Moje porudžbine</h2>
      {orders.length === 0 ? (
        <p>Nemate nijednu porudžbinu.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderHeader onClick={() => toggleOrderDetails(order._id)}>
              <span>
                <BsCalendar3 /> {new Date(order.createdAt).toLocaleString()}
              </span>
              <span>
                <b>Cena: </b>
                {order.total} RSD
              </span>
            </OrderHeader>
            <OrderDetails
              isOpen={openOrders[order._id]}
              refHeight={
                contentRefs.current[order._id]?.scrollHeight || 0
              }
            >
              <InnerContent
                ref={(el) => (contentRefs.current[order._id] = el)}
              >
                <h4>Proizvodi:</h4>
                {order.products.map((product, index) => (
                  <OrderItem key={index}>
                    <span>
                      <BsBag /> {product.name}
                    </span>
                    <span>Količina: {product.quantity}</span>
                  </OrderItem>
                ))}
              </InnerContent>
            </OrderDetails>
          </OrderCard>
        ))
      )}
    </div>
  );
}
