import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const slides = [
  "/hero/pf-ulov-1.jpg?v=20260803",
  "/hero/pf-ulov-2.jpg?v=20260803",
  "/hero/pf-ulov-3.jpg?v=20260803",
  "/hero/pf-ulov-4.jpg?v=20260803",
  "/hero/pf-ulov-5.jpg?v=20260803",
];

const lures = [
  {
    href: "/product/6984c47b18c2a7be186204ff",
    image: "/pf/pf-vobler-plavi.png",
    alt: "PF Vobler plavi",
    variant: "blue",
  },
  {
    href: "/product/6984c48e18c2a7be18620506",
    image: "/pf/pf-vobler-zuti.png",
    alt: "PF Vobler žuti",
    variant: "yellow",
  },
  {
    href: "/product/6a15c5a99f65bb4fbbbead31",
    image: "/pf/pf-vobler-crni.png",
    alt: "PF Vobler crni",
    variant: "black",
  },
];

const Hero = styled.section`
  position: relative;
  min-height: 520px;
  overflow: hidden;
  background: #111;
  color: #fff;
  background-image: url("/hero/pf-ulov-1.jpg?v=20260803");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;

  @media (max-width: 768px) {
    min-height: 620px;
    align-items: flex-end;
  }
`;

const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active, $entered }) => ($active && $entered ? 1 : 1.04)});
  transition: opacity 950ms ease, transform 2600ms ease;
  will-change: opacity, transform;
  z-index: -2;
`;

const SlideImage = styled(Image)`
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.48)),
    radial-gradient(circle at center, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.38));
  z-index: -1;
`;

const Content = styled.div`
  width: min(950px, calc(100% - 48px));
  margin: 0 auto;
  text-align: center;
  padding: 28px 0 42px;

  @media (max-width: 768px) {
    width: min(100% - 28px, 520px);
    padding-bottom: 54px;
  }
`;

const Kicker = styled.p`
  margin: 0 0 42px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-bottom: 22px;
    font-size: 0.68rem;
    letter-spacing: 2.5px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.9rem);
  line-height: 0.96;
  font-weight: 800;
  text-transform: uppercase;
`;

const TitleAccent = styled.span`
  display: block;
  margin-top: 8px;
  color: #f39052;
  font-size: clamp(1.9rem, 4.5vw, 3.2rem);
  text-transform: none;
`;

const Subtitle = styled.p`
  max-width: 720px;
  margin: 28px auto 0;
  color: rgba(255, 255, 255, 0.92);
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 500;

  @media (max-width: 768px) {
    margin-top: 22px;
    font-size: 0.92rem;
  }
`;

const LureButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 52px;
  flex-wrap: wrap;
`;

const lureBorder = {
  blue: "#18b8e8",
  yellow: "#f1d30a",
  black: "rgba(255, 255, 255, 0.55)",
};

const LureButton = styled(Link)`
  width: 216px;
  min-height: 92px;
  border-radius: 999px;
  border: 1px solid ${({ $variant }) => lureBorder[$variant] || lureBorder.black};
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 800;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 0, 0, 0.58);
  }

  @media (max-width: 768px) {
    width: 150px;
    min-height: 76px;
    font-size: 0.66rem;
  }

  ${({ $variant }) =>
    $variant === "yellow" &&
    css`
      background: rgba(65, 62, 0, 0.42);
    `}
`;

const LureImage = styled.img`
  width: 126px;
  height: 38px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 102px;
    height: 32px;
  }
`;

const SmallText = styled.p`
  margin: 26px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.84rem;
  font-weight: 600;
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 22px;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? "22px" : "10px")};
  height: 10px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#f39052" : "rgba(255, 255, 255, 0.16)")};
  cursor: pointer;
  padding: 0;
  transition: width 180ms ease, background 180ms ease;
`;

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const entryFrame = requestAnimationFrame(() => {
      setHasEntered(true);
    });

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => {
      cancelAnimationFrame(entryFrame);
      clearInterval(timer);
    };
  }, []);

  return (
    <Hero>
      {slides.map((slide, index) => (
        <Slide
          key={slide}
          $active={index === activeSlide}
          $entered={hasEntered}
        >
          <SlideImage
            src={slide}
            alt=""
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            quality={76}
            sizes="100vw"
          />
        </Slide>
      ))}
      <Overlay />
      <Content>
        <Kicker>Promaja Fishing kolekcija</Kicker>
        <Title>
          PF Vobler
          <TitleAccent>Dvojac koji lovi trofeje</TitleAccent>
        </Title>
        <Subtitle>
          <strong>PF Vobler plavi</strong> i <strong>PF Vobler žuti</strong> - dva modela koja
          pokrivaju sve uslove na vodi i već su dokazala svoju efikasnost.
        </Subtitle>
        <LureButtons>
          {lures.map((lure) => (
            <LureButton key={lure.href} href={lure.href} $variant={lure.variant}>
              <LureImage src={lure.image} alt={lure.alt} />
              <span>Dodaj u korpu</span>
            </LureButton>
          ))}
        </LureButtons>
        <SmallText>Poruči oba i budi spreman za svaki uslov kada si na vodi.</SmallText>
      </Content>
      <Dots>
        {slides.map((slide, index) => (
          <Dot
            key={slide}
            type="button"
            $active={index === activeSlide}
            aria-label={`Prikaži slajd ${index + 1}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </Dots>
    </Hero>
  );
}
