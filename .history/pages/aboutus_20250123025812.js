import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Section = styled.section`
  padding: 100px 20px;
  background-color: ${(props) => (props.gray ? "#f9f9f9" : "white")};
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
  margin: 40px 0 20px;
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

const List = styled.ul`
  list-style-type: none;
  max-width: 800px;
  margin: 30px auto;
  padding: 0;

  li {
    font-size: 1.3rem;
    line-height: 1.8;
    color: #555;
    margin: 15px 0;
    position: relative;
    padding-left: 30px;

    &:before {
      content: "✔";
      position: absolute;
      left: 0;
      color: #f97316;
      font-size: 1.5rem;
    }
  }
`;

const SwiperContainer = styled.div`
  max-width: 1100px;
  margin: 50px auto;
  border-radius: 15px;
  overflow: hidden;

  .swiper-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }

  .swiper-pagination-bullet {
    background: #f97316;
  }
`;

const ImageBanner = styled.div`
  width: 100%;
  height: 400px;
  background-image: url("https://images.unsplash.com/photo-1560807707-8cc77767d783");
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
    font-size: 3rem;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    margin-top: 10px;
    font-style: italic;
  }
`;

const Testimonial = styled.div`
  background-color: #f3f4f6;
  padding: 60px 20px;
  text-align: center;

  h3 {
    font-size: 2rem;
    color: #f97316;
    margin-bottom: 30px;
  }

  p {
    font-size: 1.2rem;
    color: #444;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 20px;
    font-style: italic;
  }

  span {
    font-weight: bold;
    color: #222;
  }
`;

export default function AboutUs() {
  return (
    <>
      <Header />
      <ImageBanner>
        <BannerText>
          <h1>PromajaFishing - Naša Priča</h1>
          <p>Priroda. Strast. Zajednica. Vizija.</p>
        </BannerText>
      </ImageBanner>

      <Section>
        <Title>Kako je sve počelo?</Title>
        <Text>
          Sve je započelo iz <Highlight>iskrene ljubavi prema pecanju</Highlight>. Kao deca, proveli smo vikende uz
          reke i jezera, istražujući prirodu i stvarajući nezaboravne uspomene. Pecanje nije bilo samo hobi – bilo je
          deo našeg identiteta i način na koji smo se povezivali sa porodicom i prirodom.
        </Text>
        <Text>
          Danas, kroz PromajaFishing, nastavljamo tu tradiciju, delimo strast i pomažemo drugima da otkriju čari
          ribolova. Naša misija nije samo da prodajemo proizvode, već da edukujemo, inspirišemo i gradimo zajednicu.
        </Text>
      </Section>

      <Section gray>
        <Subtitle>Šta nas čini jedinstvenima?</Subtitle>
        <List>
          <li>Verujemo u snagu zajedništva i deljenja iskustava.</li>
          <li>Nudimo samo proverene i kvalitetne proizvode.</li>
          <li>Organizujemo edukativne radionice i vodiče za sve nivoe iskustva.</li>
          <li>Podržavamo očuvanje prirode kroz odgovoran ribolov.</li>
        </List>
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
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="Naši ulovi"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e37a"
              alt="Ribolov u prirodi"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1598511720281-d56cd7c5bb07"
              alt="Porodični ribolov"
            />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>

      <Section>
        <Subtitle>Naša Vizija</Subtitle>
        <Text>
          PromajaFishing želi da postane vodeći brend u regionu za sve ljubitelje ribolova. Naša vizija je svet gde
          ljudi cene prirodu, uče jedni od drugih i dele zajedničku strast prema vodi i životu na otvorenom.
        </Text>
        <Text>
          Ribolov nije samo sport – to je način života. Zajedno možemo stvoriti budućnost gde priroda i čovek žive
          u harmoniji.
        </Text>
      </Section>

      

      <Footer />
    </>
  );
}
