import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect } from "react";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const StyledHeader = styled.header`
  background-color: #222;
  color: #FFA500;
  padding: 20px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
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
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  a {
    color: #bbbbbb;
    padding: 8px 15px;
    display: block;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
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

const LogoWrapper = styled.div`
  max-width: 150px;

  img {
    width: 100%;
    height: auto;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <LogoWrapper>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="PromajaShop Logo"
                width={240}
                height={30}
                priority
              />
            </Link>
          </LogoWrapper>
          <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
            <div />
            <div />
            <div />
          </HamburgerMenu>
          <Nav open={menuOpen}>
            <NavLink href="/aboutus">O nama</NavLink>
            <Dropdown>
              <NavLink href="#">Kategorije</NavLink>
              <DropdownContent>
                <Link href="/categories/varalice">Varalice</Link>
                <Link href="/categories/majice">Majice</Link>
              </DropdownContent>
            </Dropdown>
            <NavLink href="/products">Svi proizvodi</NavLink>
            <NavLink href="/cart">Korpa ({cartProducts?.length || 0})</NavLink>
            <LoginButton href="/login">
              <FaUserCircle /> Prijavi se
            </LoginButton>
          </Nav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
