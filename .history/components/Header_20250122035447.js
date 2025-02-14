import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import CategoriesDropdownDesktop from "./CategoriesDropdownDesktop";
import CategoriesDropdownMobile from "./CategoriesDropdownMobile";

const StyledHeader = styled.header`
  background-color: #222;
  color: #FFA500;
  padding: 20px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
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
      <Center>
        <Wrapper>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="PromajaShop Logo"
              width={240}
              height={30}
              priority
            />
          </Link>
          <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
            <div />
            <div />
            <div />
          </HamburgerMenu>
          <StyledNav>
            <Link href="/aboutus">O nama</Link>
            <CategoriesDropdownDesktop />
            <Link href="/products">Svi proizvodi</Link>
            <Link href="/cart">Korpa ({cartProducts?.length || 0})</Link>
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
            <CategoriesDropdownMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </MobileNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
