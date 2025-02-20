import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import CategoriesDropdown from "./CategoriesDropdown";

const StyledHeader = styled.header`
  background-color: #222;
  color: #FFA500;
  padding: 25px 30px; /* Vraćena normalna veličina */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #222;
    padding: 20px;
    border-radius: 0 0 10px 10px;
    z-index: 10;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)`
  color: #bbbbbb;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #f39052;
  color: #222222;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e69500;
  }

  svg {
    margin-right: 8px;
    font-size: 1.2rem;
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

const MobileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

/* Ikonica korpe na telefonu - više nije preko logotipa */
const MobileCartWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const MobileCartIcon = styled(Link)`
  color: #FFA500;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  max-width: 250px; /* Vraćena normalna veličina na desktop */
  
  @media (max-width: 768px) {
    max-width: 160px;
  }

  img {
    width: 100%;
    height: auto;
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
          <MobileHeaderWrapper>
            {/* Mobilna Korpa - Premestili smo je van logotipa */}
            <MobileCartWrapper>
              <MobileCartIcon href="/cart">
                <FaShoppingCart />
              </MobileCartIcon>
            </MobileCartWrapper>

            {/* Logo */}
            <Link href="/">
              <LogoWrapper>
                <Image
                  src="/logo.png"
                  alt="PromajaShop Logo"
                  width={250}
                  height={50}
                  priority
                />
              </LogoWrapper>
            </Link>

            {/* Hamburger meni */}
            <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
              <div />
              <div />
              <div />
            </HamburgerMenu>
          </MobileHeaderWrapper>

          {/* Navigacija */}
          <StyledNav open={menuOpen}>
            <NavLink href="/aboutus">O nama</NavLink>
            <CategoriesDropdown />
            <NavLink href="/products">Svi proizvodi</NavLink>
            <NavLink href="/cart">Korpa ({cartProducts?.length || 0})</NavLink>

            {isLoggedIn ? (
              <LoginButton href="/account">
                <FaUserCircle /> Moj nalog
              </LoginButton>
            ) : (
              <LoginButton href="/login">
                <FaUserCircle /> Prijavi se
              </LoginButton>
            )}
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
