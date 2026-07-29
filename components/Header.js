import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import CategoriesDropdown from "./CategoriesDropdown";
import CartIcon from "./icons/CartIcon";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  background-color: #222;
  color: #FFA500;
  padding: 35px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: visible; /* Postavi ovako ako postoji problem */
  position: relative;
  z-index: 1100;

  @media (max-width: 768px) {
    padding: 26px 15px;
  }
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
  overflow: visible; /* Dodaj ovo */

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    gap: 26px;
    background-color: #222;
    padding: 26px 20px 28px;
    border-radius: 0 0 10px 10px;
    z-index: 1200;
    box-shadow: 0 18px 32px rgba(0, 0, 0, 0.36);
  }
`;

const NavLink = styled(Link)`
  color: #bbbbbb;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.3;
    justify-content: center;
  }
`;

const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ $active }) => ($active ? "#f39052" : "#2f2f2f")};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? "#333" : "#2a2a2a")};
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #333;
    border-color: #3a3a3a;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const DesktopSearchButton = styled(SearchButton)`
  @media (max-width: 768px) {
    display: none;
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

  @media (max-width: 768px) {
    min-width: 140px;
    padding: 11px 18px;
    font-size: 17px;
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

const MobileActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const MobileSearchButton = styled(SearchButton)`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const LogoWrapper = styled.div`
  max-width: 150px;

  @media (max-width: 768px) {
    max-width: 120px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const SearchPanel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 60;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "-8px")});
  max-height: ${({ $open }) => ($open ? "92px" : "0")};
  overflow: hidden;
  padding: ${({ $open }) => ($open ? "16px 25px" : "0 25px")};
  background: rgba(17, 17, 17, 0.88);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  transition: opacity 0.22s ease, transform 0.28s ease, max-height 0.35s ease, padding 0.28s ease;
`;

const SearchForm = styled.form`
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  gap: 10px;

  @media (max-width: 520px) {
    gap: 8px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  background: #222;
  border: 1px solid #333;
  color: #fff;
  border-radius: 10px;
  padding: 0 16px;
  min-height: 46px;
  font-size: 16px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #555;
    box-shadow: 0 0 0 4px rgba(243, 144, 82, 0.12);
  }

  &::placeholder {
    color: #8f8f8f;
  }
`;

const SearchSubmit = styled.button`
  background: #f39052;
  color: #222;
  border: none;
  border-radius: 10px;
  padding: 0 18px;
  min-height: 46px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;

  svg {
    display: none;
  }

  &:hover {
    background: #e69500;
    box-shadow: 0 6px 14px rgba(243, 144, 82, 0.25);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 520px) {
    width: 46px;
    padding: 0;
    font-size: 0;

    svg {
      display: inline-block;
      font-size: 16px;
    }
  }
`;

const FloatingCartLink = styled(Link)`
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #f39052;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 1000;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);

  svg {
    width: 28px;
    height: 28px;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background-color: #222;
  color: #fff;
  border: 2px solid #f39052;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setSearchTerm(typeof router.query.search === "string" ? router.query.search : "");
  }, [router.query.search]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }

      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const tagName = event.target?.tagName?.toLowerCase();
        if (tagName !== "input" && tagName !== "textarea") {
          event.preventDefault();
          setSearchOpen(true);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function toggleSearch() {
    setSearchOpen((current) => !current);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const term = searchTerm.trim();
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(term ? `/products?search=${encodeURIComponent(term)}` : "/products");
  }

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
          <MobileActions>
            <MobileSearchButton
              type="button"
              aria-label="Pretraga"
              title="Pretraga"
              $active={searchOpen}
              onClick={toggleSearch}
            >
              <FaSearch />
            </MobileSearchButton>
            <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
              <div />
              <div />
              <div />
            </HamburgerMenu>
          </MobileActions>
          <StyledNav open={menuOpen}>
            <NavLink href="/aboutus">O nama</NavLink>
            <CategoriesDropdown />
            <NavLink href="/products">Svi proizvodi</NavLink>
            <DesktopSearchButton
              type="button"
              aria-label="Pretraga"
              title="Pretraga (/)"
              $active={searchOpen}
              onClick={toggleSearch}
            >
              <FaSearch />
            </DesktopSearchButton>

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
      <SearchPanel $open={searchOpen}>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            ref={searchInputRef}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pretraži proizvode..."
          />
          <SearchSubmit type="submit">
            Pretraži
            <FaSearch />
          </SearchSubmit>
        </SearchForm>
      </SearchPanel>
      <FloatingCartLink href="/cart" aria-label="Korpa">
        <CartIcon />
        {!!cartProducts?.length && <CartBadge>{cartProducts.length}</CartBadge>}
      </FloatingCartLink>
    </StyledHeader>
  );
}
