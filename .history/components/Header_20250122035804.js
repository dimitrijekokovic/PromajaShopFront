import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import CategoriesDropdownDesktop from "./CategoriesDropdownDesktop";
import CategoriesDropdownMobile from "./CategoriesDropdownMobile";
import { FaUserCircle } from "react-icons/fa";

const StyledHeader = styled.header`
  background-color: #222;
  color: #fff;
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  flex: 1;
`;

const StyledNav = styled.nav`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      color: #ffa500;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.div`
  flex: 1;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const CartIndicator = styled.div`
  position: relative;

  a {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: #ffa500;
    }
  }

  span {
    position: absolute;
    top: -5px;
    right: -10px;
    background: #ffa500;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
    padding: 2px 5px;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <StyledHeader>
      <Wrapper>
        <Logo>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="PromajaShop Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </Logo>
        <StyledNav>
          <Link href="/aboutus">O nama</Link>
          <CategoriesDropdownDesktop />
          <Link href="/products">Svi proizvodi</Link>
          <CartIndicator>
            <Link href="/cart">
              Korpa <span>{cartProducts?.length || 0}</span>
            </Link>
          </CartIndicator>
          {isLoggedIn ? (
            <Link href="/account">
              <FaUserCircle /> Moj nalog
            </Link>
          ) : (
            <Link href="/login">
              <FaUserCircle /> Prijavi se
            </Link>
          )}
        </StyledNav>
        <MobileNav>
          <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
            <div />
            <div />
            <div />
          </HamburgerMenu>
          <CategoriesDropdownMobile
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </MobileNav>
      </Wrapper>
    </StyledHeader>
  );
}
