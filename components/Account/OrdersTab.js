import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsBag, BsCalendar3, BsChevronDown } from "react-icons/bs";
import axios from "axios";

const OrderCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  overflow: hidden;
`;

const OrderHeader = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 14px;
  background: #fff;
  color: #333;
  padding: 16px 18px;
  border: 0;
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: #fff7ed;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const OrderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-weight: 700;

  svg {
    color: #f97316;
    flex-shrink: 0;
  }
`;

const OrderMeta = styled.span`
  color: #666;
  font-size: 0.92rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  justify-self: end;
  min-width: 92px;
  padding: 7px 10px;
  border-radius: 999px;
  background: ${({ $status }) => ($status === "pending" ? "#fff7ed" : "#eef2ff")};
  color: ${({ $status }) => ($status === "pending" ? "#c2410c" : "#3730a3")};
  border: 1px solid ${({ $status }) => ($status === "pending" ? "#fed7aa" : "#c7d2fe")};
  font-size: 0.82rem;
  font-weight: 800;
  text-align: center;

  @media (max-width: 700px) {
    justify-self: start;
  }
`;

const PriceBlock = styled.span`
  min-width: 120px;
  color: #111;
  font-weight: 800;
  text-align: right;

  @media (max-width: 700px) {
    text-align: left;
  }
`;

const Chevron = styled(BsChevronDown)`
  color: #f97316;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0")});
  transition: transform 0.2s ease;
`;

const OrderDetails = styled.div`
  overflow: hidden;
  height: ${({ $isOpen, $refHeight }) => ($isOpen ? `${$refHeight}px` : "0")};
  transition: height 0.25s ease;
  background: #f9fafb;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
`;

const ProductHeading = styled.h4`
  margin: 0;
  color: #333;
`;

const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 11px 14px;
  border: 1px solid #eee;
  border-radius: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
`;

const ProductName = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 650;

  svg {
    color: #f97316;
  }
`;

const Notice = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.5;
`;

function formatCurrency(value) {
  const amount = Number(value) || 0;
  return `${amount.toLocaleString("sr-RS")} RSD`;
}

function formatDate(value) {
  if (!value) return "Nepoznat datum";
  return new Date(value).toLocaleString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status) {
  if (status === "pending") return "U obradi";
  return status || "U obradi";
}

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
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/orders", {
          params: { email: userEmail },
        });
        setOrders(response.data.orders || []);
      } catch {
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
    return <Notice>Učitavanje porudžbina...</Notice>;
  }

  if (error) {
    return <Notice>{error}</Notice>;
  }

  return (
    <div>
      <h2>Moje porudžbine</h2>
      {orders.length === 0 ? (
        <Notice>Nemate nijednu porudžbinu.</Notice>
      ) : (
        orders.map((order) => {
          const isOpen = !!openOrders[order._id];

          return (
            <OrderCard key={order._id}>
              <OrderHeader
                type="button"
                onClick={() => toggleOrderDetails(order._id)}
                aria-expanded={isOpen}
              >
                <OrderTitle>
                  <BsCalendar3 />
                  <span>
                    Porudžbina
                    <br />
                    <OrderMeta>{formatDate(order.createdAt)}</OrderMeta>
                  </span>
                </OrderTitle>
                <StatusBadge $status={order.status}>{statusLabel(order.status)}</StatusBadge>
                <PriceBlock>
                  {formatCurrency(order.total)}
                  <Chevron $open={isOpen} />
                </PriceBlock>
              </OrderHeader>
              <OrderDetails
                $isOpen={isOpen}
                $refHeight={contentRefs.current[order._id]?.scrollHeight || 0}
              >
                <InnerContent ref={(el) => (contentRefs.current[order._id] = el)}>
                  <ProductHeading>Proizvodi</ProductHeading>
                  {(order.products || []).map((product, index) => (
                    <OrderItem key={index}>
                      <ProductName>
                        <BsBag /> {product.name}
                      </ProductName>
                      <span>Količina: {product.quantity}</span>
                      {product.price ? <strong>{formatCurrency(product.price)}</strong> : null}
                    </OrderItem>
                  ))}
                </InnerContent>
              </OrderDetails>
            </OrderCard>
          );
        })
      )}
    </div>
  );
}
