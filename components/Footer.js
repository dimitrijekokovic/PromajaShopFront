import Link from "next/link";
import styled from "styled-components";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import Center from "./Center";

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding-top: 30px;
  margin-top:30px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;


const FooterSection = styled.div`
  background-color: #2a2a2a; /* Tamnija pozadina unutar sekcija */
  padding: 20px;
  border-radius: 5px; /* Blagi zaobljeni uglovi */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Blagi efekat senke */

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    text-align: left;
    color: #f7934b; /* Narandžasta za naslove */
  }

  p, ul {
    font-size: 0.9rem;
    line-height: 1.6;
    text-align: left;
    color: #ddd; /* Svetliji tekst */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;

    a {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s ease; /* Tranzicija za hover efekat */

      &:hover {
        color: #ff6600; /* Promena boje na hover */
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease; /* Tranzicija za hover efekat */

    &:hover {
      color: #f7934b; /* Promena boje na hover */
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;


const LegalSection = styled.div`
  background-color: #f7934b;
  text-align: center;
  padding: 1px;
  color: #222222;
  font-size: 1rem; /* Povećan font */

  a {
    color: #222222;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
    return (
      <FooterContainer>
        <Center>
        <FooterContent>
          <FooterSection>
            <h3>O nama</h3>
            <p>
              Vaša prva destinacija za sve potrebe ribolova. Kvalitetne varalice,
              oprema i saveti na jednom mestu.
            </p>
          </FooterSection>
  
          {/* Linkovi */}
          <FooterSection>
            <h3>Brze veze</h3>
            <ul>
              <li>
                <Link href="/aboutus" legacyBehavior>
                  <a>O nama</a>
                </Link>
              </li>
              <li>
                <Link href="/products" legacyBehavior>
                  <a>Svi proizvodi</a>
                </Link>
              </li>
              <li>
                <Link href="/blog" legacyBehavior>
                  <a>Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/account" legacyBehavior>
                  <a>Moj nalog</a>
                </Link>
              </li>
            </ul>
          </FooterSection>
  
          {/* Kontakt informacije */}
          <FooterSection>
          <h3>Kontakt</h3>
          <p>Email: promajafishing@gmail.com</p>
          <p>Lokacija: Beograd, Srbija</p>
          </FooterSection>
  
          {/* Društvene mreže */}
          <FooterSection>
            <h3>Pratite nas</h3>
            <SocialLinks>
            <Link  href="https://www.instagram.com/promajafishing/" legacyBehavior>
                <a target="_blank">
                  <FaInstagram /> Instagram
                </a>
              </Link>
              <Link href="https://www.tiktok.com/@promajafishing?lang=en" legacyBehavior>
                <a target="_blank">
                  <FaTiktok /> TikTok
                </a>
              </Link>
              
              <Link href="https://www.youtube.com/@PromajaFishing" legacyBehavior>
                <a target="_blank">
                  <FaYoutube /> YouTube
                </a>
              </Link>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
        </Center>
        {/* Pravna napomena */}
        <LegalSection>
          <p>
            &copy; 2024 Promaja Shop. Sva prava zadržana.{" "}
            <Link href="/privatnost" legacyBehavior>
              <a>Politika privatnosti</a>
            </Link>{" "}
            |{" "}
            <Link href="/uslovi" legacyBehavior>
              <a>Uslovi korišćenja</a>
            </Link>
          </p>
        </LegalSection>
      </FooterContainer>
    );
  }