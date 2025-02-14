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
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 40px;
  color: #222;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &:after {
    content: "";
    position: absolute;
    width: 80px;
    height: 5px;
    background: #f97316;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  color: #f97316;
  margin: 40px 0;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 2;
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
  max-width: 1100px;
  margin: 50px auto;
  border-radius: 15px;
  overflow: hidden;

  .swiper-slide img {
    width: 100%; /* Prilagodjava širinu slike veličini containera */
    height: 600px; /* Fiksna visina da slike budu pravougaonastog oblika */
    object-fit: cover; /* Održava proporcije slike i centriranje */
    border-radius: 10px; /* Zaobljeni uglovi za lepši izgled */
  }

  .swiper-pagination-bullet {
    background: #f97316;
  }
`;


const ImageBanner = styled.div`
  width: 100%;
  height: 500px;
  background-image: url("https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/styles/article_masthead/public/2022-03/fishing-stanley-resort-sunset-country.jpg.webp?VersionId=7cKKlfZzQEbVXSA3LojqVO00lvjjF9f7&itok=75vxcPhT");
  background-size: cover; /* Fokus na ključni deo slike */
  background-position: center center; /* Centriraj sliku */
  background-repeat: no-repeat;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.6), 
      rgba(0, 0, 0, 0.2)
    ); /* Gradijent za moderniji izgled */
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
    font-size: 3.2rem; /* Veći naslov za upečatljivost */
    font-weight: 900;
    margin: 0;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* Dodaj blagu senku za kontrast */
  }

  p {
    font-size: 1.8rem; /* Istakni podnaslov */
    margin-top: 15px;
    font-style: italic;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  }
`;
export default function AboutUs() {
  return (
    <>
      <Header />
      <ImageBanner>
        <BannerText>
          <h1>PromajaFishing Priča</h1>
          <p>Priroda. Strast. Zajednica.</p>
        </BannerText>
      </ImageBanner>

      <Section>
        <Title>Naš početak</Title>
        <Text>
          Priča o <Highlight>PromajaFishing</Highlight> započela je kada su se dvojica drugara iz osnovne škole
          združila upravo zahvaljujući ljubavi prema pecanju. Još od malih nogu, vikendi uz reku i prve avanture s
          ribolovačkim štapom povezivali su ih sa prirodom i porodicom. Pecanje su zavoleli kroz porodičnu tradiciju,
          "zarazivši se" strasti svojih rođaka i prijatelja.
        </Text>
        <Text>
          Kako su odrastali, ljubav prema pecanju nije jenjavala. Povremeno su se sastajali, planirali zajedničke
          ribolovačke avanture i uživali u trenutku bega od svakodnevice. Krajem 2023. godine, u decembru, doneli su
          odluku koja će promeniti sve – da svoju strast podele sa svetom i pokrenu <Highlight>PromajaFishing</Highlight>.
        </Text>
      </Section>

      <Section gray>
        <Subtitle>Prvi koraci</Subtitle>
        <Text>
          Profil na društvenim mrežama otvoren je sa idejom da se objavljuju edukativni video sadržaji o pecanju.
          Isprva su delili osnovne savete, trikove i iskustva iz sopstvenih avantura. Na njihovo iznenađenje, strast
          koju su delili prepoznali su mnogi, a zajednica ljubitelja pecanja počela je da raste neverovatnom brzinom.
        </Text>
        <Text>
          Shvatili su da mogu da učine mnogo više – da okupe sve zaljubljenike u ribolov na jednom mestu i izgrade
          zajednicu koja deli ljubav prema prirodi, vodi i ovom divnom sportu. Tako je <Highlight>PromajaFishing </Highlight>
          psotao više od brenda – postao je pokret.
        </Text>
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
        src="/slika1.jpg" /* Relativna putanja do slike u public folderu */
        alt="Prva slika"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/slika2.jpg" /* Relativna putanja do slike u public folderu */
        alt="Druga slika"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/slika3.jpg" /* Ako imaš treću sliku, dodaj je ovde ili ukloni ovaj deo */
        alt="Treća slika"
      />
    </SwiperSlide>
  </Swiper>
</SwiperContainer>


      <Section>
        <Subtitle>Naša vizija</Subtitle>
        <Text>
          Naša misija je jasna – <Highlight>stvoriti najveću ribolovačku zajednicu na Balkanu</Highlight>. Želimo da
          svakog dana inspirišemo ljude da se povežu sa prirodom, da osete čari ribolova i da dele iskustva sa
          istomišljenicima. Ribolov nije samo sport; on je stil života, prilika za opuštanje i povezivanje sa onim
          što je zaista važno.
        </Text>
        <Text>
          Kroz naše proizvode, edukativne sadržaje i zajedničke događaje, trudimo se da pružimo sve što je potrebno
          ljubiteljima pecanja – od početnika do iskusnih ribolovaca. <Highlight>PromajaFishing</Highlight> je mesto
          gde strast prema vodi spaja ljude.
        </Text>
      </Section>

      <Footer />
    </>
  );
}
