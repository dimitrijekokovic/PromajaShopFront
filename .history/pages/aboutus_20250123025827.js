import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Section = styled.section`
  padding: 80px 20px;
  background-color: ${(props) => (props.gray ? "#f3f4f6" : "white")};
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 30px;
  color: #222;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 4px;
    background: #f97316;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Subtitle = styled.h2`
  font-size: 2.2rem;
  color: #f97316;
  margin: 30px 0;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: #444;
  max-width: 900px;
  margin: 20px auto;
  text-align: justify;
`;

const Highlight = styled.span`
  color: #f97316;
  font-weight: bold;
`;

const SwiperContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  border-radius: 15px;
  overflow: hidden;

  .swiper-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background: #f97316;
  }
`;

const ImageBanner = styled.div`
  width: 100%;
  height: 350px;
  background-image: url("https://images.unsplash.com/photo-1601573076733-8bb6c05658fc");
  background-size: cover;
  background-position: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
  }
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    margin: 0;
  }

  p {
    font-size: 1.3rem;
    margin-top: 10px;
    font-style: italic;
  }
`;

export default function AboutUs() {
  return (
    <>
      <Header />
      <ImageBanner>
        <BannerText>
          <h1>PromajaFishing - Naša Priča</h1>
          <p>Priroda. Strast. Zajednica.</p>
        </BannerText>
      </ImageBanner>

      <Section>
        <Title>Kako je sve počelo?</Title>
        <Text>
          Sve je počelo iz <Highlight>iskrene ljubavi prema pecanju</Highlight>. Kao deca, vikendi pored reke i 
          prvi ulovi bili su naši najlepši trenuci. Strast prema ribolovu se razvijala tokom godina, postajući 
          ne samo hobi, već i način povezivanja sa prirodom i ljudima.
        </Text>
        <Text>
          Danas, pecanje za nas nije samo beg od stresa – to je zajedništvo, edukacija i inspiracija. Svaka 
          avantura na vodi nosi priču, a svaka priča nas podseća na ono što je zaista važno.
        </Text>
      </Section>

      <Section gray>
        <Subtitle>Šta nas čini drugačijima?</Subtitle>
        <Text>
          Naša zajednica nije samo grupa ribolovaca. Mi smo porodica koja deli <Highlight>strast prema vodi, 
          prirodi i učenju</Highlight>. Sa željom da inspirišemo nove generacije, pružamo:
        </Text>
        <ul style={{ textAlign: "left", maxWidth: "800px", margin: "20px auto", lineHeight: "1.8" }}>
          <li><Highlight>Edukativne sadržaje</Highlight> o tehnikama pecanja i opremi</li>
          <li>Proizvode vrhunskog kvaliteta, kao što je naš <Highlight>PF Vobler</Highlight></li>
          <li>Podršku i savete za sve ribolovce, bez obzira na nivo iskustva</li>
        </ul>
      </Section>

      <SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e37a"
              alt="Ribolov u akciji"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1559894204-6b6b3ad2e3a7"
              alt="Naši ulovi"
            />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>

      <Section>
        <Subtitle>Naša vizija</Subtitle>
        <Text>
          Naš cilj je jednostavan – želimo da inspirišemo ljude da otkriju magiju ribolova i povežu se sa 
          prirodom. Kroz kvalitetne proizvode, edukativne sadržaje i podršku zajednice, gradimo budućnost 
          gde pecanje postaje više od hobija.
        </Text>
      </Section>

      <Footer />
    </>
  );
}
